export async function POST(req) {
  try {
    const body = await req.json();

    if (!body.name || !body.email || !body.message) {
      return Response.json(
        { error: "All fields are required." },
        { status: 400 }
      );
    }

    const formData = new FormData();
    formData.append("your-name", body.name);
    formData.append("your-email", body.email);
    formData.append("your-message", body.message);

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_WP_API}/contact-form-7/v1/contact-forms/123/feedback`,
      {
        method: "POST",
        body: formData,
      }
    );

    const data = await response.json();

    return Response.json(data, { status: response.status });
  } catch (error) {
    console.error("Contact API Error:", error);
    return Response.json(
      { error: "Server error. Please try again." },
      { status: 500 }
    );
  }
}
