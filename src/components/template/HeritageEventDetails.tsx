"use client";

import React from "react";
import { useHeritageEntrance } from "./useHeritageEntrance";

interface EventItem {
  title: string;
  date: string;
  time: string;
  venue: string;
  address: string;
  mapUrl?: string;
}

interface HeritageEventDetailsProps {
  events?: EventItem[];
}

export function HeritageEventDetails({
  events = [
    {
      title: "Akad Nikah",
      date: "Sabtu, 20 Agustus 2026",
      time: "08:00 - 10:00 WIB",
      venue: "Masjid Agung Al-Azhar",
      address: "Jl. Sisingamangaraja, Kebayoran Baru, Jakarta Selatan",
      mapUrl: "https://maps.google.com",
    },
    {
      title: "Resepsi",
      date: "Sabtu, 20 Agustus 2026",
      time: "11:00 - 14:00 WIB",
      venue: "Gedung Serba Guna",
      address: "Jl. Sultan Iskandar Muda, Jakarta Selatan",
      mapUrl: "https://maps.google.com",
    },
  ],
}: HeritageEventDetailsProps) {
  const { ref, visible } = useHeritageEntrance();

  return (
    <section
      ref={ref}
      className="heritage-section heritage-event-section relative"
    >
      <div
        className={`heritage-entrance relative z-10 mx-auto w-full max-w-md ${
          visible ? "visible" : ""
        }`}
      >
        {/* Section title */}
        <h2
          className="heritage-section-title mb-2"
          style={{ fontFamily: "var(--font-cormorant)" }}
        >
          Waktu & Tempat
        </h2>
        <p className="heritage-section-subtitle mb-8">
          Merupakan kehormatan bagi kami apabila Bapak/Ibu/Saudara/i berkenan hadir
        </p>

        {/* Event cards */}
        <div className="heritage-event-cards">
          {events.map((event, idx) => (
            <div key={idx} className="heritage-card heritage-event-card">
              {/* Event title */}
              <h3
                className="heritage-event-title"
                style={{ fontFamily: "var(--font-cormorant)" }}
              >
                {event.title}
              </h3>

              {/* Date */}
              <p className="heritage-event-date">{event.date}</p>

              {/* Time */}
              <p className="heritage-event-time">{event.time}</p>

              {/* Divider */}
              <div className="heritage-divider my-4">
                <span className="heritage-divider-dot" />
                <span className="heritage-divider-line" />
                <span className="heritage-divider-dot" />
              </div>

              {/* Venue */}
              <p className="heritage-event-venue">{event.venue}</p>

              {/* Address */}
              <p className="heritage-event-address mb-4">{event.address}</p>

              {/* Map button */}
              {event.mapUrl && (
                <a
                  href={event.mapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="heritage-event-map-btn"
                  style={{ fontFamily: "var(--font-cormorant)" }}
                >
                  Buka Maps
                </a>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
