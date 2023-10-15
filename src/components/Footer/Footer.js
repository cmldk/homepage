import Social from '../Social/Social';

export default function Footer() {
  return (
    <section className="mt-10 font-['regular']">
      <hr className="border-dark dark:border-gray-300" />
      <div className="block md:flex items-center pt-3 pb-10">
        <span className="flex items-center order-2 md:order-1">
          <Social iconClassName={'mr-4'} />
        </span>
      </div>
    </section>
  );
}
