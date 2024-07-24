export const ssr = false

export async function load({ fetch, params }) {
    const myHeaders = new Headers();
    myHeaders.append("ngrok-skip-browser-warning", "true");

    const event_response = await fetch(`https://edb6-13-229-201-218.ngrok-free.app/events/${params.slug}`, { headers: myHeaders });
    const event = await event_response.json();

    const remarksOptions = {
        false_positive: "Mark as False Positive",
        duplicate: "Mark as Duplicate",
        needs_further_review: "Mark for further review",
    };

    if (event.remarks === "false_positive") {
        delete remarksOptions.false_positive;
    }

    if (event.remarks === "duplicate") {
        delete remarksOptions.duplicate;
    }

    if (event.remarks === "needs_further_review") {
        delete remarksOptions.needs_further_review;
    }

    return {
        event: event,
        remarksOptions: remarksOptions
    }
}