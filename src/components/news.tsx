
import type React from "react"
import { useState } from "react"
import useNews from "../hooks/useNews"
import { useNavigate } from "react-router-dom"

export default function NewsFormPage() {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [date, setDate] = useState("")
  const [image, setImage] = useState<File | null>(null)
  const [errors, setErrors] = useState<{
    title?: string
    description?: string
    date?: string
    image?: string
  }>({})
  const navigate = useNavigate()
const {doAddNews} = useNews()
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setImage(file)
    }
  }

  const handleSubmit = async(e: React.FormEvent) => {
    e.preventDefault()
const formdata = new FormData()
    // Basic validation
    const newErrors: {
      title?: string
      description?: string
      date?: string
      image?: string
    } = {}

    if (!title.trim()) {
      newErrors.title = "News title is required"
  
    }

    if (!description.trim()) {
      newErrors.description = "Description is required"
 
    } else if (description.length < 10) {
      newErrors.description = "Description must be at least 10 characters"
     
    }

    if (!date) {
      newErrors.date = "Publication date is required"
 
    }

    if (!image) {
      newErrors.image = "Please upload an image"
       
    }
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
}
  
    

    if (Object.keys(newErrors).length === 0) {
      // Handle successful form submission here
      setErrors({ title: "", description:"", date:"", image : ""})
    
      console.log("News submission:", { title, description, date, image })
    }

    formdata.append('title', title)
    formdata.append('description', description)
    formdata.append('date', date)
    if (image !== null) {
            formdata.append('image', image)
    }

await doAddNews(formdata)
  }



  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
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
        <div className="bg-card rounded-lg shadow-lg border border-border p-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-black text-foreground mb-2 font-sans">Create News Article</h1>
            <p className="text-muted text-balance">Fill in the details to publish your news article</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-foreground mb-2">
                News Title
              </label>
              <input
                id="title"
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className={`w-full px-4 py-3 bg-input border rounded-lg text-foreground placeholder-muted focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition-colors ${
                  errors.title ? "border-destructive" : "border-border"
                }`}
                placeholder="Enter the news title"
              />
              {errors.title && <p className="mt-1 text-sm text-destructive">{errors.title}</p>}
            </div>

            <div>
              <label htmlFor="description" className="block text-sm font-medium text-foreground mb-2">
                Description
              </label>
              <textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={4}
                className={`w-full px-4 py-3 bg-input border rounded-lg text-foreground placeholder-muted focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition-colors resize-none ${
                  errors.description ? "border-destructive" : "border-border"
                }`}
                placeholder="Write the news description"
              />
              {errors.description && <p className="mt-1 text-sm text-destructive">{errors.description}</p>}
            </div>

            <div>
              <label htmlFor="date" className="block text-sm font-medium text-foreground mb-2">
                Publication Date
              </label>
              <input
                id="date"
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className={`w-full px-4 py-3 bg-input border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition-colors ${
                  errors.date ? "border-destructive" : "border-border"
                }`}
              />
              {errors.date && <p className="mt-1 text-sm text-destructive">{errors.date}</p>}
            </div>

            <div>
              <label htmlFor="image" className="block text-sm font-medium text-foreground mb-2">
                Upload Image
              </label>
              <div className="relative">
                <input id="image" type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
                <label
                  htmlFor="image"
                  className={`w-full flex items-center justify-center px-4 py-3 border-2 border-dashed rounded-lg cursor-pointer transition-colors hover:bg-secondary ${
                    errors.image ? "border-destructive" : "border-border"
                  } ${image ? "bg-secondary" : "bg-input"}`}
                >
                  <div className="text-center">
                    {image ? (
                      <div className="flex items-center gap-2">
                        <svg className="w-5 h-5 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                        <span className="text-foreground font-medium">{image.name}</span>
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        <svg className="w-5 h-5 text-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                          />
                        </svg>
                        <span className="text-muted">Click to upload image</span>
                      </div>
                    )}
                  </div>
                </label>
              </div>
              {errors.image && <p className="mt-1 text-sm text-destructive">{errors.image}</p>}
            </div>

            <div className="flex gap-4 pt-4">
              <button
                type="submit"
              
                className="flex-1 cursor-pointer bg-primary text-primary-foreground py-3 px-4 rounded-lg font-medium hover:bg-accent hover:text-accent-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 transition-colors"
              >
                Create News
              </button>
              <button
                type="button"
                onClick={()=> navigate("/all-news")}
                className="flex-1 cursor-pointer bg-secondary text-secondary-foreground py-3 px-4 rounded-lg font-medium border border-border hover:bg-muted hover:text-primary-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 transition-colors"
              >
               View All News
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
