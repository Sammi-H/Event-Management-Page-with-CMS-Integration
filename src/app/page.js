import { client, urlFor } from "../lib/sanity";
import Link from "next/link";
import "./globals.css";

export default async function Home() {
  const event = await client.fetch(
    `*[_type == "event"][0]{title, description, image, date, location, slug}`
  );

  const date = new Date(event.date);
  const formattedDate = date.toLocaleDateString("se-SE", {
    year: "2-digit",
    month: "2-digit",
    day: "2-digit"
  });

  const formattedTime = date.toLocaleTimeString("se-SE", {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div className="home-page">
      <main className="home-main">
        <h1 className="event-title">{event.title}</h1>
        <h2 className="event-subtitle">{event.description}</h2>
        {event.image && (
          <img className="event-image"
            src={urlFor(event.image).width(800).url()}
            alt={event.title}
            width={800}
            height={500}
          />
        )}
        <p className="event-date">Datum: {formattedDate} Klockan: {formattedTime}</p>
        <p className="event-location">Plats: {event.location}</p>
        <button className="btn">
          <Link href="/events">Se alla event</Link>
        </button>
      </main>
    </div>
  );
}
