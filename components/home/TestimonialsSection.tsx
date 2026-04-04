"use client";

import Testimonials from "../Testimonials";


export default function TestimonialsSection({ id = "testimonials" }: { id?: string }) {
  return (
    <section id={id}>
      <Testimonials />
    </section>
  );
}