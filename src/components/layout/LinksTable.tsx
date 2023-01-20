import React from "react";

type LinkData = {
  _id: string;
  createdAt: string;
  shortenedUrl: string;
  originalUrl: string;
  description: string;
  clicks: number;
};
type Props = {
  links: LinkData[];
  setEditData: (_id: string) => void;
};

export default function LinksTable({ links, setEditData }: Props) {
  return (
    <>
      <div className="flex flex-col">
        <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
            <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Short URL
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Description
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Clicks
                    </th>
                    <th scope="col" className="relative px-6 py-3">
                      <span className="sr-only">Edit</span>
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {links.map((link, linkIdx) => (
                    <tr
                      key={link._id}
                      className={linkIdx % 2 === 0 ? "bg-white" : "bg-gray-50"}
                    >
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <a
                          target="_blank"
                          className="underline"
                          href={`${import.meta.env.VITE_AUTH0_AUDIENCE}/${
                            link.shortenedUrl
                          }`}
                        >
                          {link.shortenedUrl}
                        </a>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {link.description}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {link.clicks}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button
                          className="text-indigo-600 hover:text-indigo-900"
                          onClick={() => setEditData(link._id)}
                        >
                          Edit
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
