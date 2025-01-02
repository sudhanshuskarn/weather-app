// src/app/contact/page.js
export default function ContactPage() {
  return (
    <section className="container mx-auto py-10 px-4">
      <h2 className="text-3xl font-bold text-center mb-6">Contact Us</h2>
      <p className="text-lg">
        If you have any questions or feedback, feel free to reach out to us. We're here to help!
      </p>
      <div className="mt-6">
        <h3 className="text-2xl font-semibold">Email</h3>
        <p className="mt-2">You can contact me at <a href="https://www.linkedin.com/in/sudhanshu-karn-44653a214" target="_blank" className="text-blue-500">MyLinkedIn</a>.</p>
        <h3 className="text-2xl font-semibold mt-6">Social Media</h3>
        <p className="mt-2">Follow me on my social media pages:</p>
        <ul className="list-disc ml-6 mt-2">
          <li><a href="https://www.linkedin.com/in/sudhanshu-karn-44653a214" target="_blank" className="text-blue-500">LinkedIn</a></li>
        </ul>
      </div>
    </section>
  );
}

