import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { NewsService } from "../services/newsService";
import useNews from "../hooks/useNews";
import { useNavigate } from "react-router-dom";

export default function NewsListingPage() {
  const navigate = useNavigate();
  const { data, isSuccess, refetch } = useQuery({
    queryKey: ["allnews"],
    queryFn: async () => await new NewsService().getNews(),
  });
  const { doDeleteNews } = useNews();
  // const handleEdit = (id: number) => {
  //   console.log("[v0] Edit news item with id:", id)
  //   // Handle edit functionality here
  // }

  const handleDelete = (id: string) => {
    doDeleteNews(id);
    refetch();
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-6xl mx-auto p-6">
        <div className="mb-4 md:hidden">
          <button
            type="button"
            onClick={() => {
              if (window.history.length > 1) {
                navigate(-1)
              } else {
                navigate("/dashboard")
              }
            }}
            className="inline-flex items-center gap-2 px-3 py-2 rounded-md border border-border bg-card text-foreground hover:bg-muted transition-colors"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15 18 9 12 15 6"></polyline>
            </svg>
            <span className="text-sm">Back</span>
          </button>
        </div>
        <div className="text-center mb-12">
          <h1 className="text-4xl font-black text-foreground mb-4 font-sans">
            Latest News
          </h1>
          <p className="text-lg text-muted-foreground text-balance">
            Stay updated with the latest breaking news and stories
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {isSuccess &&
            data?.map((item) => (
              <div
                key={item.id}
                className="bg-card rounded-lg shadow-lg border border-border overflow-hidden hover:shadow-xl transition-shadow"
              >
                <div className="aspect-video overflow-hidden">
                  <img
                    src={"http://localhost:4000/" + item?.imageurl + ".png"}
                    alt={item.title}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>

                <div className="p-6">
                  <h2 className="text-xl font-bold text-card-foreground mb-3 font-sans text-balance leading-tight">
                    {item.title}
                  </h2>

                  <p className="text-muted-foreground mb-4 text-sm leading-relaxed text-pretty">
                    {item.description}
                  </p>

                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground font-medium">
                      {new Date(item?.eventdate).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </span>

                    <div className="flex gap-2">
                      {/* <button
                      onClick={() => handleEdit(item.id)}
                      className="px-3 py-1.5 bg-primary text-primary-foreground text-xs font-medium rounded-md hover:bg-accent hover:text-accent-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-colors"
                    >
                      Edit
                    </button> */}
                      <button
                        onClick={() => handleDelete(item._id)}
                        className="px-3 py-1.5 bg-destructive text-destructive-foreground text-xs font-medium rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-ring transition-colors"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
        </div>

        {data?.length === 0 && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">📰</div>
            <h3 className="text-xl font-semibold text-foreground mb-2">
              No news articles found
            </h3>
            <p className="text-muted-foreground">
              All news articles have been deleted.
            </p>

            <button
              type="button"
              onClick={() => navigate("/add-news")}
              className="flex-1 mt-2 cursor-pointer bg-secondary text-secondary-foreground py-3 px-4 rounded-lg font-medium border border-border hover:bg-muted hover:text-primary-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 transition-colors"
            >
              Create a News
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
