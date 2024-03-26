import config from "../../config";

export default {
    submitEvents: async (events, token) => {
        const eventData = events.map(event => {
            // Create a new object for each event
            return {
                ...event, // Spread the properties of the original event object
                metadata: typeof event.metadata === 'string' ? event.metadata : JSON.stringify(event.metadata)
            };
        });

        console.log('`${config.API_URL}/meta/events`', `${config.API_URL}/meta/events`)

        const response = await fetch(`${config.API_URL}/meta/events`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify({events: eventData})
        });

        return await response.json();
    }
}