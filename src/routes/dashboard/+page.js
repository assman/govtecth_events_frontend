export const ssr = false

export async function load({ fetch }) {
    const myHeaders = new Headers();
    myHeaders.append("ngrok-skip-browser-warning", "true");

    const total_count_response = await fetch(`https://edb6-13-229-201-218.ngrok-free.app/events/count`, { headers: myHeaders });
    const total_events_count = await total_count_response.json();

    const handled_count_response = await fetch(`https://edb6-13-229-201-218.ngrok-free.app/events/count?handled=true`, { headers: myHeaders });
    const handled_events_count = await handled_count_response.json();

    const pending_count_response = await fetch(`https://edb6-13-229-201-218.ngrok-free.app/events/count?handled=false`, { headers: myHeaders });
    const pending_events_count = await pending_count_response.json();

    return {
        total_events: total_events_count,
        handled_events: handled_events_count,
        pending_events: pending_events_count
    }
}