"use client";

import { EmptyContent } from "../empty-content";
import { useRouter } from "next/navigation";

import { addResume } from "@/action/save-resume";
import { getID } from "@/lib/get-id";

import { Button } from "@/components/ui/button";
import { Edit, Plus, Trash } from "lucide-react";

import { deleteResume } from "@/action/delete-resume";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { ContainerWithSpinner } from "@/components/common/container-with-spinner";
import { getResumes } from "../../action/get-resumes";

interface IALLResumeProps {
  // resumesPromise: Promise<{
  //   docs: ResumeOutputType[];
  // }>;
  userId: string;
}

export function AllResume({ userId }: IALLResumeProps) {
  const queryClient = useQueryClient();
  const {
    data: resumes,
    error,
    isLoading: isResumesLoading,
  } = useQuery({
    queryKey: ["resumes", userId],
    queryFn: async () => getResumes(userId),
    retry: 0,
    refetchOnWindowFocus: false,
    select: (data) => data.docs,
  });
  const { mutate: deleteSingleResumeMutate, isPending: isDeletePending } =
    useMutation({
      mutationKey: ["deleteSingleResume"],
      mutationFn: ({
        resumeId,
        userId,
      }: {
        resumeId: string;
        userId: string;
      }) => {
        return deleteResume(resumeId, userId);
      },
      onError: (error) => {
        toast.error(`Failed to delete resume. Please try again!`);
      },
      onSuccess: async (data) => {
        await queryClient.invalidateQueries({
          queryKey: ["resumes", userId],
        });
      },
      onSettled: () => {
        toast.success(`Resume deleted successfully!`);
      },
    });

  // const { docs: resumes, error } = use(resumesPromise);

  const router = useRouter();

  if (isResumesLoading || isDeletePending) {
    return <ContainerWithSpinner />;
  }
  if (error) {
    return <div>Oops. Something went wrong please try again</div>;
  }

  const addNewResumeHandler = async () => {
    const id = getID();
    await addResume({
      resume: {
        id,
      },
      resumeId: id,
      userId: userId,
    });
    router.push(`/resume/editor?id=${id}`);
    return;
  };

  return (
    <div className="w-full h-full">
      {resumes && !resumes?.length && (
        <EmptyContent
          title="No Resumes "
          description="Get started on crafting your first resume to kickstart your career journey"
          buttonContent="Create New Resume"
          buttonProps={{
            onClick: addNewResumeHandler,
          }}
        />
      )}
      {resumes && resumes.length > 0 && (
        <>
          <h2 className=" text-3xl font-semibold mb-10">All Resumes</h2>
          <div className=" flex gap-10 flex-wrap">
            {resumes.map((resume) => {
              return (
                <div
                  className="w-[18rem] h-[21rem]  rounded-md overflow-hidden flex flex-col"
                  key={resume.id}
                >
                  <div className=" basis-[50%] bg-white"></div>
                  <div className=" bg-background flex-grow flex flex-col items-center p-5 ">
                    <h3 className=" text-base flex-grow font-bold">
                      {resume.name}
                    </h3>
                    <div className="w-full flex gap-3  items-center [&_button]:flex-1">
                      {/* <div className=" basis-[40%]">
                        <h5 className="text-sm">Created At:</h5>
                        <p className=" text-xs">
                          {dayjs(resume.createdAt).format("YYYY-MM-DD")}
                        </p>
                      </div> */}
                      <Button
                        onClick={async () => {
                          deleteSingleResumeMutate({
                            userId,
                            resumeId: resume.id as string,
                          });
                        }}
                        variant={"ghost"}
                        className=" hover:text-neon-red"
                      >
                        <Trash /> Delete
                      </Button>
                      <Button
                        onClick={() => {
                          router.push(`/resume/editor?id=${resume.id}`);
                        }}
                      >
                        <Edit /> Edit
                      </Button>
                    </div>
                  </div>
                </div>
              );
            })}
            <div className="w-[18rem] h-[21rem] rounded-md  flex justify-center items-center  shadow-[0_0_1px_2px] shadow-neon-red/20">
              <Button onClick={addNewResumeHandler}>
                <Plus />
                Add New Resume
              </Button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
