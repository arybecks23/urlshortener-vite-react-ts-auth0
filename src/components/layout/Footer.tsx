import {
  AcademicCapIcon,
  BeakerIcon,
  BoltIcon,
  RocketLaunchIcon,
} from "@heroicons/react/24/outline";

type Props = {};

const Footer = (props: Props) => {
  return (
    <div className="bg-white px-9 py-12 flex flex-col lg:flex-row lg:gap-24 lg:items-start">
      <div className="lg:basis-2/5">
        <div className="my-12 lg:my-0">
          <h1 className="font-medium text-5xl">Let's work together</h1>
        </div>
        <div>
          <p className="py-2">
            Although I’m not currently looking for any new opportunities, my
            inbox is always open. Whether you have a question or just want to
            say hi, I’ll try my best to get back to you! Say Hello.
          </p>
        </div>
        <div className="flex gap-4 my-12">
          <a href="/#">
            <AcademicCapIcon className="w-10 h-10" />
          </a>
          <a href="/#">
            <BeakerIcon className="w-10 h-10" />
          </a>
          <a href="/#">
            <BoltIcon className="w-10 h-10" />
          </a>
          <a href="/#">
            <RocketLaunchIcon className="w-10 h-10" />
          </a>
          <a href="/#" rel="noopener" target="_blank">
            <span className="sr-only">Discord</span>
            <svg className="h-10 w-10" fill="currentColor" viewBox="0 0 24 24">
              <path
                fill="evenodd"
                d="M12 0C5.3 0 0 5.3 0 12s5.3 12 12 12 12-5.4 12-12S18.6 0 12 0zM9.7 5.9a.05.05 0 0 1 .06.03 8.43 8.43 0 0 1 .41.83 12.2 12.2 0 0 1 3.66 0 9.19 9.19 0 0 1 .4-.83.05.05 0 0 1 .06-.03 13.2 13.2 0 0 1 3.26 1.01.04.04 0 0 1 .02.02c1.8 2.66 2.7 5.66 2.37 9.11a.05.05 0 0 1-.02.04 13.24 13.24 0 0 1-4 2.02.05.05 0 0 1-.06-.02 10.65 10.65 0 0 1-.82-1.33.05.05 0 0 1 .02-.07 8.2 8.2 0 0 0 1.25-.6.05.05 0 0 0 .01-.08 6.47 6.47 0 0 1-.25-.2.05.05 0 0 0-.05 0 9.47 9.47 0 0 1-8.05 0 .05.05 0 0 0-.05 0l-.25.2a.05.05 0 0 0 0 .08 8.75 8.75 0 0 0 1.26.6.05.05 0 0 1 .02.07 9.48 9.48 0 0 1-.82 1.33.05.05 0 0 1-.05.02 13.28 13.28 0 0 1-4-2.02.05.05 0 0 1-.02-.04c-.28-2.99.29-6.01 2.37-9.11a.05.05 0 0 1 .02-.02A13.17 13.17 0 0 1 9.7 5.9zM9.35 11c-.8 0-1.43.72-1.43 1.6 0 .9.64 1.62 1.43 1.62.8 0 1.44-.72 1.44-1.61.02-.88-.63-1.61-1.44-1.61zm5.33 0c-.8 0-1.44.72-1.44 1.6 0 .9.65 1.62 1.44 1.62.8 0 1.43-.72 1.43-1.61.02-.88-.63-1.61-1.43-1.61z"
              ></path>
            </svg>
          </a>
          <a href="#">
            <span className="sr-only">GitHub</span>
            <svg className="h-10 w-10" fill="currentColor" viewBox="0 0 24 24">
              <path
                fill-rule="evenodd"
                d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                clip-rule="evenodd"
              />
            </svg>
          </a>
        </div>
      </div>
      <div className="py-9 lg:basis-3/5 lg:py-0">
        <form className="flex flex-col gap-2">
          <input placeholder="Name" className="bg-gray-100 py-4 px-8  w-full" />
          <input
            placeholder="Email"
            className="bg-gray-100 py-4 px-8  w-full"
          />
          <textarea
            name=""
            id=""
            cols={30}
            rows={10}
            placeholder="Type your message here"
            className="bg-gray-100 py-4 px-8  w-full"
          ></textarea>
          <button className="bg-stone-800 py-4 px-8 w-full text-white text-2xl">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default Footer;
