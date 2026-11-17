"use client";

import { useState, useEffect } from "react";

type Issue = {
  id: string;
  title: string;
  description: string | null;
  status: "pending" | "in process" | "delayed" | "completed";
  priority: "light" | "moderate" | "urgent" | "high-priority";
  created_at: string;
  updated_at: string;
};

export default function DashboardPage() {
  const [issues, setIssues] = useState<Issue[]>([]); //declaring that issues is an array of the type Issue objects

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [creating, setCreating] = useState(false); //for creating and updating an issue, both times this is usefule

  const [isModalOpen, setIsModalOpen] = useState(false); //for the create issue modal

  const [selectedIssue, setSelectedIssue] = useState<Issue | null>(null); //null by default unless the issue is selected by you - this is to store the state of the issue you want to edit

  //issues need to be filtered too -
  const [statusFilter, setStatusFilter] = useState("all");
  const [priorityFilter, setPriorityFilter] = useState("all");

  //sorting issues -
  const [sortBy, setSortBy] = useState("newest");

  const filteredIssues = issues.filter((issue) => {
    const matchesStatus =
      statusFilter === "all" || issue.status === statusFilter;

    const matchesPriority =
      priorityFilter === "all" || issue.priority === priorityFilter;

    return matchesStatus && matchesPriority; //if both filters applied -> AND logic, otherwise only the applied filter works.
  });

  const sortedIssues = [
    ...filteredIssues.sort((a, b) => {
      //sort by creation date -

      if (sortBy === "newest") {
        return (
          new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
        );
      }

      if (sortBy === "oldest") {
        return (
          new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
        );
      }

      // Define priority ranking
      const priorityOrder = {
        light: 1,
        moderate: 2,
        urgent: 3,
        "high-priority": 4,
      };
      if (sortBy === "highest") {
        return priorityOrder[b.priority] - priorityOrder[a.priority];
      }

      if (sortBy === "lowest") {
        return priorityOrder[a.priority] - priorityOrder[b.priority];
      }

      return 0;
    }),
  ];

  useEffect(() => {
    async function fetchIssues() {
      try {
        const response = await fetch("/api/issues");

        if (!response.ok) {
          throw new Error("cannot fetch issues");
        }

        const data = await response.json();

        setIssues(data);
      } catch (error) {
        setError("unable to load issues");
      } finally {
        setLoading(false);
      }
    }

    fetchIssues();
  }, []);

  //create issue handler (form) -

  async function HandleSubmitIssue(event: React.SubmitEvent<HTMLFormElement>) {
    event.preventDefault();

    const form = event.currentTarget;

    const formData = new FormData(form);

    setCreating(true);
    setError("");

    const title = String(formData.get("title") ?? "");
    const description = formData.get("description");
    const priority = formData.get("priority");
    const status = formData.get("status");

    const isEditing = selectedIssue !== null;

    const url = isEditing ? `/api/issues/${selectedIssue.id}` : `/api/issues`;
    const method = isEditing ? "PATCH" : "POST";

    try {
      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, description, status, priority }),
      });

      const savedIssue = await response.json();

      if (!response.ok) {
        setError(
          savedIssue.message || savedIssue.error || "unable to save issue",
        );
        return;
      }

      if (isEditing) {
        //if you are editing a previousIssue, it maps its id with previousIssue and swaps the new vaue with the old one while returning a new map of previousIssues
        setIssues((previousIssues) =>
          previousIssues.map((issue) =>
            issue.id === savedIssue.id ? savedIssue : issue,
          ),
        );
      } else {
        //save the new issue into the list of issues (previousIssues)
        setIssues((previousIssues) => [savedIssue, ...previousIssues]);
      }

      form.reset(); //reset the form
      setIsModalOpen(false);
      setSelectedIssue(null);
    } catch {
      setError("something went wrong, try again");
    } finally {
      setCreating(false);
    }
  }

  //delete handler -

  async function HandleDeleteIssue(issueId: string) {
    setError("");

    const confirmed = window.confirm("are you sure");
    if (!confirmed) {
      return;
    }
    setLoading(true);

    try {
      //take the id -
      const response = await fetch(`/api/issues/${issueId}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        return Response.json("deleted issue successfully");
      }

      setIssues((previousIssues) =>
        previousIssues.filter((issue) => issue.id !== issueId),
      );
    } catch {
      setError("something went wrong, try again");
    } finally {
      setLoading(false);
    }
  }

  //helper functions for status and priority styling
  function getStatusStyle(status: Issue["status"]) {
    const styles = {
      pending: "bg-zinc-500/10 text-zinc-400 border-zinc-500/20",
      "in process": "bg-blue-500/10 text-blue-400 border-blue-500/20",
      delayed: "bg-red-500/10 text-red-400 border-red-500/20",
      completed: "bg-green-500/10 text-green-400 border-green-500/20",
    };

    return styles[status];
  }

  function getPriorityStyle(priority: Issue["priority"]) {
    const styles = {
      light: "text-zinc-400",
      moderate: "text-blue-400",
      urgent: "text-orange-400",
      "high-priority": "text-red-400",
    };

    return styles[priority];
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      <div className="mx-auto max-w-6xl px-6 py-10">
        {/* Dashboard header */}
        <section className="flex items-center justify-between border-b border-white/10 pb-6">
          <h1 className="text-2xl font-bold tracking-tight">Quadratic</h1>

          <p className="text-sm text-zinc-400">Dashboard</p>
        </section>

        <main className="mt-10">
          {/* Page heading */}
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-3xl font-bold">My issues</h2>

              <p className="mt-2 text-sm text-zinc-400">
                Track your work and keep things moving.
              </p>
            </div>
          </div>

          {/* //filter issues -  */}

          <div className="mt-6 flex flex-wrap gap-2">
            {["all", "pending", "in process", "delayed", "completed"].map(
              (status) => (
                <button
                  key={status}
                  type="button"
                  onClick={() => setStatusFilter(status)}
                  className={`rounded-lg px-4 py-2 text-sm capitalize
                  ${
                    statusFilter === status
                      ? "bg-purple-800 text-white"
                      : "bg-white/5 text-zinc-400 hover:bg-white/10"
                  }`}
                >
                  {status === "all" ? "All issues" : status}
                </button>
              ),
            )}
          </div>

          {/* filter prioritywise -  */}
          <div className="mt-6 flex flex-wrap gap-2">
            {["all", "light", "moderate", "urgent", "high-priority"].map(
              (priority) => (
                <button
                  key={priority}
                  type="button"
                  onClick={() => setPriorityFilter(priority)}
                  className={`rounded-lg px-4 py-2 text-sm capitalize
                  ${
                    priorityFilter === priority
                      ? "bg-purple-800 text-white"
                      : "bg-white/5 text-zinc-400 hover:bg-white/10"
                  }`}
                >
                  {priority === "all" ? "All issues" : priority}
                </button>
              ),
            )}
          </div>

          <div className="mt-6">
            <label className="mr-3 text-sm text-zinc-400">Sort by:</label>

            <select
              value={sortBy}
              onChange={(event) => setSortBy(event.target.value)}
              className="rounded-lg border border-white/10 bg-zinc-900 px-4 py-2 text-sm text-white"
            >
              <option value="newest">Newest first</option>
              <option value="oldest">Oldest first</option>
              <option value="highest">Highest priority first</option>
              <option value="lowest">Lowest priority first</option>
            </select>
          </div>

          {/* Issue cards */}
          <section className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div className="rounded-xl border border-white/10 bg-white/[0.03] p-5">
              <p className="text-sm text-zinc-400">All issues</p>
              <h3 className="mt-3 text-3xl font-bold">{issues.length}</h3>
            </div>

            <div className="rounded-xl border border-white/10 bg-white/[0.03] p-5">
              <p className="text-sm text-zinc-400">In process</p>
              <h3 className="mt-3 text-3xl font-bold">
                {issues.filter((issue) => issue.status === "in process").length}
              </h3>
            </div>

            <div className="rounded-xl border border-white/10 bg-white/[0.03] p-5">
              <p className="text-sm text-zinc-400">Completed</p>
              <h3 className="mt-3 text-3xl font-bold">
                {issues.filter((issue) => issue.status === "completed").length}
              </h3>
            </div>
          </section>

          {/* Recent issues */}

          <button
            onClick={() => {
              setIsModalOpen(true);
              setSelectedIssue(null);
            }}
            type="button"
            className="rounded-lg bg-purple-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-purple-500"
          >
            + New issue
          </button>
          {loading ? (
            <p className="mt-5 text-zinc-400">Loading issues...</p>
          ) : error ? (
            <p className="mt-5 text-red-400">{error}</p>
          ) : filteredIssues.length === 0 ? (
            <div className="mt-5 flex flex-col items-center justify-center rounded-xl border border-white/10 bg-white/[0.03] px-6 py-16 text-center">
              <h3 className="text-lg font-medium">No issues yet</h3>
              <p className="mt-2 text-sm text-zinc-400">
                Create your first issue to get started.
              </p>
            </div>
          ) : (
            <div className="mt-5 space-y-3">
              {sortedIssues.map((issue) => (
                <div
                  key={issue.id}
                  className="rounded-xl border border-white/10 bg-white/[0.03] p-5 transition hover:border-purple-500/30 hover:bg-white/[0.05]"
                >
                  {/* Card header */}
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div className="min-w-0">
                      <h3 className="font-semibold text-white">
                        {issue.title}
                      </h3>

                      <p className="mt-2 text-sm text-zinc-400">
                        {issue.description || "No description provided"}
                      </p>
                    </div>

                    {/* Actions */}
                    <div className="flex shrink-0 items-center gap-3">
                      <button
                        type="button"
                        onClick={() => {
                          setSelectedIssue(issue);
                          setIsModalOpen(true);
                        }}
                        className="text-sm text-purple-400 hover:text-purple-300"
                      >
                        Edit
                      </button>

                      <button
                        type="button"
                        onClick={() => HandleDeleteIssue(issue.id)}
                        className="text-sm text-red-400 hover:text-red-300"
                      >
                        Delete
                      </button>
                    </div>
                  </div>

                  {/* Status and priority */}
                  <div className="mt-4 flex flex-wrap items-center gap-3">
                    <span
                      className={`rounded-full border px-3 py-1 text-xs font-medium ${getStatusStyle(issue.status)}`}
                    >
                      {issue.status}
                    </span>

                    <span
                      className={`text-xs font-medium ${getPriorityStyle(issue.priority)}`}
                    >
                      {issue.priority}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* "create new issue" modal logic and ui -  */}
          {isModalOpen && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">
              <div className="w-full max-w-lg rounded-2xl border border-white/10 bg-zinc-900 p-6 shadow-2xl">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-semibold">
                    {selectedIssue ? "Edit Issue" : "Create issue"}
                  </h2>

                  <button
                    type="button"
                    onClick={() => {
                      setIsModalOpen(false);
                      setSelectedIssue(null);
                    }}
                    className="text-zinc-400 hover:text-white"
                  >
                    ✕
                  </button>
                </div>

                <form onSubmit={HandleSubmitIssue} className="mt-6 space-y-4">
                  <div>
                    <label className="mb-2 block text-sm text-zinc-300">
                      Title
                    </label>
                    <input
                      name="title"
                      required
                      defaultValue={selectedIssue?.title ?? ""}
                      placeholder="What needs to be done?"
                      className="w-full rounded-lg border border-white/10 bg-zinc-800 px-3 py-2 text-white outline-none focus:border-purple-500"
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-sm text-zinc-300">
                      Description
                    </label>
                    <textarea
                      name="description"
                      rows={3}
                      defaultValue={selectedIssue?.description ?? ""}
                      placeholder="Add some details..."
                      className="w-full rounded-lg border border-white/10 bg-zinc-800 px-3 py-2 text-white outline-none focus:border-purple-500"
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-sm text-zinc-300">
                      Status
                    </label>
                    <select
                      name="status"
                      defaultValue={selectedIssue?.status ?? "pending"}
                      className="w-full rounded-lg border border-white/10 bg-zinc-800 px-3 py-2 text-white"
                    >
                      <option value="pending">Pending</option>
                      <option value="in process">In progress</option>
                      <option value="delayed">Delayed</option>
                      <option value="completed">Completed</option>
                    </select>
                  </div>

                  <div>
                    <label className="mb-2 block text-sm text-zinc-300">
                      Priority
                    </label>
                    <select
                      name="priority"
                      defaultValue={selectedIssue?.priority ?? "moderate"}
                      className="w-full rounded-lg border border-white/10 bg-zinc-800 px-3 py-2 text-white"
                    >
                      <option value="light">Low</option>
                      <option value="moderate">Medium</option>
                      <option value="urgent">Urgent</option>
                      <option value="high-priority">High</option>
                    </select>
                  </div>

                  <div className="flex justify-end gap-3 pt-2">
                    <button
                      type="button"
                      onClick={() => {
                        setIsModalOpen(false);
                        setSelectedIssue(null);
                      }}
                      className="rounded-lg border border-white/10 px-4 py-2 text-sm text-zinc-300 hover:bg-white/5"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={creating}
                      className="rounded-lg bg-purple-600 px-4 py-2 text-sm font-medium text-white hover:bg-purple-500 disabled:opacity-50"
                    >
                      {creating
                        ? "Saving..."
                        : selectedIssue
                          ? "Save changes"
                          : "Create issue"}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
