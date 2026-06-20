import NaukaHero from '@/components/nauka/NaukaHero';
import NaukaEtalase from '@/components/nauka/NaukaEtalase';
import NaukaKenapa from '@/components/nauka/NaukaKenapa';
import NaukaPrinsip from '@/components/nauka/NaukaPrinsip';
import NaukaBayanganMomen from '@/components/nauka/NaukaBayanganMomen';
import NaukaMockup from '@/components/nauka/NaukaMockup';
import NaukaHarga from '@/components/nauka/NaukaHarga';
import NaukaCheckout from '@/components/nauka/NaukaCheckout';
import NaukaCTA from '@/components/nauka/NaukaCTA';
import NaukaFooter from '@/components/nauka/NaukaFooter';

export default function Home() {
  return (
    <main>
      <NaukaHero />
      <NaukaEtalase />

      <NaukaKenapa />
      <NaukaPrinsip />

      <NaukaBayanganMomen />
      <NaukaMockup />

      <NaukaHarga />
      <NaukaCheckout />

      <NaukaCTA />
      <NaukaFooter />
    </main>
  );
}
