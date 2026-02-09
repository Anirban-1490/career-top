"use client";

import {
  deleteOptimizedResume,
  getUserOptimizedResumes,
} from "@/action/optimizer";
import { ContainerWithSpinner } from "@/components/common/container-with-spinner";
import { Button } from "@/components/ui/button";
import {
  OptimizedResumeType,
  UserOptimizedResumeQueryType,
} from "@/types/optimizer";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ConfigProvider, Table, TableProps, theme } from "antd";
import dayjs from "dayjs";
import { useRouter } from "next/navigation";
import { useMemo } from "react";
import { toast } from "sonner";

export function DataTable() {
  const router = useRouter();
  const queryClient = useQueryClient();

  const { data, isFetching } = useQuery({
    queryKey: ["optimzied-resumes"],
    queryFn: async () => {
      return await getUserOptimizedResumes();
    },
    refetchOnWindowFocus: false,
  });

  const { mutate, isPending } = useMutation({
    mutationFn: async (resumeId: string) => {
      return await deleteOptimizedResume(resumeId);
    },
    async onSettled(data) {
      if (data?.error) {
        toast.error(data.message);
        return;
      }

      await queryClient.invalidateQueries({ queryKey: ["optimzied-resumes"] });
      const newOptiomizedResumes =
        queryClient.getQueryData<UserOptimizedResumeQueryType>([
          "optimzied-resumes",
        ]);
      toast.success(data?.message);

      if (!newOptiomizedResumes?.optimizedResumes?.length) {
        router.push("/dashboard/resume-optimizer/upload");
        return;
      }
    },
  });

  const columns: TableProps<OptimizedResumeType>["columns"] = useMemo(() => {
    return [
      {
        dataIndex: "file",
        key: "file",
        title: "Name",
        render: (_, { file }) => {
          return <>{file.name}</>;
        },
      },
      {
        dataIndex: "createdAt",
        key: "createdAt",
        title: "Created At",
        render: (_, { createdAt }) => {
          return <>{dayjs(createdAt).format("YYYY-MM-DD")}</>;
        },
      },
      {
        dataIndex: "updatedAt",
        key: "updatedAt",
        title: "Updated At",
        render: (_, { updatedAt }) => {
          return <>{dayjs(updatedAt).format("YYYY-MM-DD")}</>;
        },
      },
      {
        key: "delete",

        render: (value, record) => {
          return (
            <>
              <Button
                onClick={(ev) => {
                  ev.stopPropagation();
                  ev.preventDefault();
                  mutate(record.id);
                }}
                disabled={isPending}
                size={"sm"}
              >
                {isPending ? (
                  <ContainerWithSpinner
                    spinnerProps={{ className: "size-5" }}
                  />
                ) : (
                  "Delete"
                )}
              </Button>
            </>
          );
        },
      },
    ];
  }, [mutate, isPending]);
  return (
    <ConfigProvider
      theme={{
        algorithm: theme.darkAlgorithm,
        components: {
          Pagination: {
            itemActiveColor: "var(--color-neon-red)",
            itemActiveColorHover: "var(--accent-neon-red)",
            colorPrimary: "var(--color-neon-red)",
            colorPrimaryHover: "var(--accent-neon-red)",
          },
        },
      }}
    >
      {" "}
      <Table<OptimizedResumeType>
        columns={columns}
        rowKey={(row) => {
          return row.id;
        }}
        rowClassName={" cursor-pointer"}
        onRow={(row, index) => {
          return {
            onClick: (ev) => {
              ev.preventDefault();
              router.push(`/dashboard/resume-optimizer/${row.id}`);
            },
          };
        }}
        dataSource={data?.optimizedResumes || []}
      />
    </ConfigProvider>
  );
}
