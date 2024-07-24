export const ssr = false

export async function load({ fetch, url }) {
    const myHeaders = new Headers();
    myHeaders.append("ngrok-skip-browser-warning", "true");

    const events_response = await fetch(`https://edb6-13-229-201-218.ngrok-free.app/events?${url.searchParams}`, { headers: myHeaders });
    const events = await events_response.json();

    return {
        events: events,
    }
}