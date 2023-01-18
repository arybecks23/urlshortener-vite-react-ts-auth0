import { useAuth0 } from "@auth0/auth0-react";
import { ArrowPathIcon, PlusIcon } from "@heroicons/react/24/outline";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import DashboardNav from "../components/layout/DashboardNav";
import DeleteModal from "../components/layout/DeleteModal";
import EditUrlSlideOverPanel from "../components/layout/EditUrlSlideOverPanel";
import NewUrlSlideOverPanel from "../components/layout/NewUrlSlideOverPanel";
import LinksTable from "./LinksTable";

type LinkData = {
  _id: string;
  createdAt: string;
  shortenedUrl: string;
  originalUrl: string;
  description: string;
  clicks: number;
};
type NewUrlData = {
  url: string;
  description: string;
};
type UpdateUrlData = {
  id: string;
  description: string;
};
type DeleteURLData = {
  id: string;
};
export default function Dashboard() {
  const { user, getAccessTokenSilently, logout } = useAuth0();
  const [token, setToken] = useState("");
  const [links, setLinks] = useState<LinkData[]>([]);
  const [editPanelOpen, setEditPanelOpen] = useState(false);
  const [editPanelData, setEditPanelData] = useState<LinkData | undefined>();
  const [newPanelOpen, setNewPanelOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [currentDeleteId, setCurrentDeleteId] = useState("");

  const getToken = async () => {
    const accessToken = await getAccessTokenSilently({
      audience: import.meta.env.VITE_AUTH0_AUDIENCE,
    });
    //Dev env only
    import.meta.env.DEV && console.log(accessToken);
    setToken(accessToken);
  };

  const { refetch, isFetching, isError, isSuccess, data } = useQuery({
    queryKey: ["urls"],
    queryFn: async () => {
      if (token !== "") {
        const res = await fetch("/api/private/urls", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        return res.json();
      }
    },
    // enabled: false,
    refetchOnWindowFocus: false,
  });
  const newURLMutation = useMutation({
    mutationFn: async (newUrlData: NewUrlData) => {
      const response = await fetch("/api/private/urls", {
        method: "POST",
        cache: "no-cache",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(newUrlData),
      });
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["urls"]);
    },
  });
  const updateURLMutation = useMutation({
    mutationFn: async (updateURLData: UpdateUrlData) => {
      const response = await fetch(`/api/private/urls/${updateURLData.id}`, {
        method: "PATCH",
        cache: "no-cache",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(updateURLData),
      });
      // return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["urls"]);
    },
  });
  const deleteURLMutation = useMutation({
    mutationFn: async (deleteURLData: DeleteURLData) => {
      const response = await fetch(`/api/private/urls/${deleteURLData.id}`, {
        method: "DELETE",
        cache: "no-cache",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      // return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["urls"]);
    },
  });

  const queryClient = useQueryClient();

  useEffect(() => {
    getToken();
  }, []);
  useEffect(() => {
    if (token !== "") {
      refetch();
    }
  }, [token]);
  useEffect(() => {
    if (isSuccess) {
      setLinks(data);
    }
  }, [data]);

  const setEditData = (linkId: string) => {
    if (links.length > 0) {
      const currentEditLink = links.find((link) => link._id == linkId);
      if (currentEditLink) {
        setEditPanelOpen(true);
        setEditPanelData(currentEditLink);
      }
    }
  };
  const onNewURLSubmit = (data: NewUrlData) => {
    newURLMutation.mutate(data);
  };
  const onUpdateURLSubmit = (data: UpdateUrlData) => {
    updateURLMutation.mutate(data);
  };
  const onSubmitDeleteURL = () => {
    setEditPanelOpen(false);
    if (currentDeleteId !== "") {
      console.log("delete", currentDeleteId);
      deleteURLMutation.mutate({
        id: currentDeleteId,
      });
    }
    setCurrentDeleteId("");
  };
  const openConfirmDeleteModal = (id: string) => {
    setCurrentDeleteId(id);
    setDeleteModalOpen(true);
  };

  if (user) {
    return (
      <>
        <DeleteModal
          open={deleteModalOpen}
          setOpen={setDeleteModalOpen}
          onSubmitDeleteURL={onSubmitDeleteURL}
        />
        <NewUrlSlideOverPanel
          open={newPanelOpen}
          setOpen={setNewPanelOpen}
          onSubmitNewUrl={onNewURLSubmit}
        />
        <EditUrlSlideOverPanel
          open={editPanelOpen}
          setOpen={setEditPanelOpen}
          data={editPanelData}
          onSubmitUpdateURL={onUpdateURLSubmit}
          onDeleteURL={openConfirmDeleteModal}
        />
        <div className="bg-gray-100">
          <div className="min-h-full">
            <DashboardNav />

            <header className="bg-white shadow">
              <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 flex justify-between">
                <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
                <button
                  className="bg-yellow-400 flex justify-center items-center px-3 rounded-md gap-2"
                  onClick={() => {
                    setNewPanelOpen(true);
                  }}
                >
                  <PlusIcon width={20} />
                  <span>New</span>
                </button>
              </div>
            </header>
            <main>
              <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
                <div className="px-4 py-6 sm:px-0">
                  {import.meta.env.DEV && (
                    <button
                      onClick={() => {
                        refetch();
                      }}
                      className=""
                    >
                      <ArrowPathIcon width={20} />
                    </button>
                  )}
                  {isFetching && (
                    <div
                      role="status"
                      className="flex flex-row justify-center items-center py-5"
                    >
                      <svg
                        aria-hidden="true"
                        className="w-6 h-6 text-gray-200 animate-spin dark:text-gray-600 fill-white"
                        viewBox="0 0 100 101"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                          fill="currentColor"
                        />
                        <path
                          d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                          fill="currentFill"
                        />
                      </svg>
                      <span className="sr-only">Loading...</span>
                    </div>
                  )}
                  <LinksTable links={links} setEditData={setEditData} />
                </div>
              </div>
            </main>
          </div>
        </div>
      </>
    );
  } else {
    return <Navigate to={"/"} />;
  }
}
