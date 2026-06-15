import numpy as np
from scipy.signal import butter, lfilter, firwin
from pydub import AudioSegment
from pydub.generators import WhiteNoise
import io
import struct

# Parameters
SAMPLE_RATE = 44100
DURATION = 30  # seconds - will loop seamlessly
TARGET_VOL_DB = -12  # Make it clearly audible

def butter_bandpass(lowcut, highcut, fs, order=4):
    nyq = 0.5 * fs
    low = lowcut / nyq
    high = highcut / nyq
    b, a = butter(order, [low, high], btype='band')
    return b, a

def butter_lowpass(cutoff, fs, order=4):
    nyq = 0.5 * fs
    normal_cutoff = cutoff / nyq
    b, a = butter(order, normal_cutoff, btype='low', analog=False)
    return b, a

def butter_highpass(cutoff, fs, order=4):
    nyq = 0.5 * fs
    normal_cutoff = cutoff / nyq
    b, a = butter(order, normal_cutoff, btype='high', analog=False)
    return b, a

def generate_water_stream(duration, sample_rate):
    """Generate a realistic flowing water / stream sound"""
    n_samples = int(duration * sample_rate)
    t = np.linspace(0, duration, n_samples, endpoint=False)
    
    # Layer 1: Low rumble - deep water flow (100-400 Hz)
    noise1 = np.random.randn(n_samples)
    b, a = butter_bandpass(100, 400, sample_rate, order=4)
    deep_flow = lfilter(b, a, noise1) * 0.4
    
    # Layer 2: Mid-range water babble (400-2000 Hz) - the main "water" character
    noise2 = np.random.randn(n_samples)
    b, a = butter_bandpass(400, 2000, sample_rate, order=4)
    mid_flow = lfilter(b, a, noise2) * 0.55
    
    # Layer 3: High frequency trickling (2000-6000 Hz) - sparkling water detail
    noise3 = np.random.randn(n_samples)
    b, a = butter_bandpass(2000, 6000, sample_rate, order=3)
    high_trickle = lfilter(b, a, noise3) * 0.3
    
    # Layer 4: Very high subtle hiss (6000-10000 Hz) - air in water
    noise4 = np.random.randn(n_samples)
    b, a = butter_bandpass(6000, 10000, sample_rate, order=3)
    subtle_hiss = lfilter(b, a, noise4) * 0.12
    
    # Amplitude modulation for natural variation
    # Slow modulation (like water surging)
    slow_mod = 0.7 + 0.3 * np.sin(2 * np.pi * 0.08 * t + np.random.rand() * 2 * np.pi)
    # Medium modulation
    med_mod = 0.8 + 0.2 * np.sin(2 * np.pi * 0.25 * t + np.random.rand() * 2 * np.pi)
    # Fast shimmer for high frequencies
    fast_mod = 0.6 + 0.4 * np.sin(2 * np.pi * 0.7 * t + np.random.rand() * 2 * np.pi)
    
    # Apply modulation
    deep_flow *= slow_mod
    mid_flow *= med_mod
    high_trickle *= fast_mod
    subtle_hiss *= fast_mod
    
    # Add occasional "splash" events (random amplitude bursts in mid-high range)
    splash_pattern = np.zeros(n_samples)
    n_splashes = int(duration * 0.8)  # about 1 splash every 1.25 seconds
    for _ in range(n_splashes):
        pos = np.random.randint(0, n_samples - int(0.15 * sample_rate))
        splash_len = int(np.random.uniform(0.03, 0.12) * sample_rate)
        splash_t = np.linspace(0, 1, splash_len)
        # Quick attack, slow decay
        envelope = np.exp(-splash_t * 8) * (1 - np.exp(-splash_t * 50))
        splash_noise = np.random.randn(splash_len)
        b, a = butter_bandpass(800, 4000, sample_rate, order=3)
        splash_filtered = lfilter(b, a, splash_noise) * 0.25
        splash_filtered *= envelope
        end = min(pos + splash_len, n_samples)
        splash_pattern[pos:end] += splash_filtered[:end-pos]
    
    # Mix all layers
    water_sound = deep_flow + mid_flow + high_trickle + subtle_hiss + splash_pattern
    
    # Crossfade for seamless loop (fade last 0.5s into first 0.5s)
    fade_len = int(0.5 * sample_rate)
    fade_out = np.linspace(1, 0, fade_len)
    fade_in = np.linspace(0, 1, fade_len)
    water_sound[-fade_len:] = water_sound[-fade_len:] * fade_out + water_sound[:fade_len] * fade_in
    
    # Normalize
    max_val = np.max(np.abs(water_sound))
    if max_val > 0:
        water_sound = water_sound / max_val * 0.85  # Leave some headroom
    
    return water_sound

def numpy_to_audio_segment(audio_data, sample_rate):
    """Convert numpy array to pydub AudioSegment"""
    # Convert to 16-bit PCM
    audio_16bit = np.int16(audio_data * 32767)
    
    # Create WAV in memory
    wav_buffer = io.BytesIO()
    
    # Write WAV header manually
    n_channels = 1
    sample_width = 2  # 16-bit
    byte_rate = sample_rate * n_channels * sample_width
    block_align = n_channels * sample_width
    data_size = len(audio_16bit) * sample_width
    
    wav_buffer.write(b'RIFF')
    wav_buffer.write(struct.pack('<I', 36 + data_size))
    wav_buffer.write(b'WAVE')
    wav_buffer.write(b'fmt ')
    wav_buffer.write(struct.pack('<I', 16))  # Subchunk1Size
    wav_buffer.write(struct.pack('<H', 1))   # AudioFormat (PCM)
    wav_buffer.write(struct.pack('<H', n_channels))
    wav_buffer.write(struct.pack('<I', sample_rate))
    wav_buffer.write(struct.pack('<I', byte_rate))
    wav_buffer.write(struct.pack('<H', block_align))
    wav_buffer.write(struct.pack('<H', sample_width * 8))
    wav_buffer.write(b'data')
    wav_buffer.write(struct.pack('<I', data_size))
    wav_buffer.write(audio_16bit.tobytes())
    
    wav_buffer.seek(0)
    return AudioSegment.from_wav(wav_buffer)

print("Generating water stream sound...")
water_audio = generate_water_stream(DURATION, SAMPLE_RATE)
print("Converting to AudioSegment...")
segment = numpy_to_audio_segment(water_audio, SAMPLE_RATE)

# Adjust volume to be clearly audible
segment = segment + TARGET_VOL_DB  # Boost volume

# Export as MP3
output_path = "/home/z/my-project/public/assets/sounds/water-stream.mp3"
print(f"Exporting to {output_path}...")
segment.export(output_path, format="mp3", bitrate="128k")

# Also generate replacement for warm-sand with water theme
# This will be the new "air" (water) sound

print(f"Done! File size: {__import__('os').path.getsize(output_path)} bytes")
print(f"Duration: {len(segment)/1000:.1f}s")
