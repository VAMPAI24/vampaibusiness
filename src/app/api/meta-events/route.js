import axios from "axios";

export async function POST(req) {
  try {
    // Parse request body as JSON
    const { eventName, userData, customData } = await req.json();

    // Validate required fields
    if (!eventName || !userData) {
      return new Response(
        JSON.stringify({
          error: "Missing required fields: eventName and userData",
        }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    // Validate environment variables
    const pixelId = process.env.NEXT_PUBLIC_EMP_PIXEL || `1778593866330692`;
    const accessToken =
      process.env.NEXT_PUBLIC_EMP_META_TOKEN ||
      `EAAZA6qS95q7YBO70zBEKrrQr9q0JM9RZAtQ1SD5yfBbpGHVStR4YYVADJtAJrtzm8ZAKmjL8ZAxyKYAeLcZCuKjcR23IVv1EP82JRhhrE0EPl2CgHZBjskQ48IxnSRMIDkxJBvzJXj20LLH4tw6ztw9ejQknd40WCoa4kamaQqddrKzHBa4ZAQ3F0VaKsdfvJTReQZDZD`;

    if (!pixelId || !accessToken) {
      console.error("Missing environment variables");
      return new Response(
        JSON.stringify({ error: "Server configuration error" }),
        { status: 500, headers: { "Content-Type": "application/json" } }
      );
    }

    // Prepare the event data
    const eventData = {
      data: [
        {
          event_name: eventName,
          event_time: Math.floor(Date.now() / 1000),
          user_data: userData,
          custom_data: customData || {},
          event_id: `${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        },
      ],
    };

    // Send event data to Meta API
    const response = await axios.post(
      `https://graph.facebook.com/v17.0/${pixelId}/events`,
      eventData,
      {
        headers: {
          "Content-Type": "application/json",
        },
        params: {
          access_token: accessToken,
        },
      }
    );

    // Return successful response
    return new Response(
      JSON.stringify({
        success: true,
        data: response.data,
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("Error sending event:", {
      message: error.message,
      response: error.response?.data,
      status: error.response?.status,
    });

    // Return appropriate error response
    const errorMessage =
      error.response?.data?.error?.message ||
      error.message ||
      "Failed to send event";
    const statusCode = error.response?.status || 500;

    return new Response(
      JSON.stringify({
        error: errorMessage,
        code: statusCode,
      }),
      {
        status: statusCode,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
