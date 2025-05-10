import Link from "next/link";
import { client, urlFor } from "../../lib/sanity";





export default async function Events() {
  const events = await client.fetch(`*[_type == "event"]{title, slug, image}`);

  return (
    <div className="home-page">
      <main className="home-main">
        <h1 className="event-title">Alla Event</h1>
        <ul>
          {events.map((event) => (
            <li key={event.slug.current}>
              <Link href={`/events/${event.slug.current}`} className="event-subtitle">
                {event.title}
                {event.image && (
                  <img
                    className="event-image"
                    src={urlFor(event.image).width(800).url()}
                    alt={event.title}
                    width={800}
                    height={500}
                  />
                )}
              </Link>
            </li>
          ))}
        </ul>
        <button className="btn">
          <Link href="/">Tillbaka</Link>
        </button>
      </main>
    </div>
  );
}

