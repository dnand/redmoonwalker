"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Star, User } from "lucide-react"
import { Badge } from "@/components/ui/badge"

interface Review {
  id: string
  userName: string
  rating: number
  comment: string
  date: string
  verified: boolean
}

interface ProductReviewsProps {
  productId: string
}

// Mock reviews for demo
const mockReviews: Review[] = [
  {
    id: "review-1",
    userName: "Sarah M.",
    rating: 5,
    comment: "Excellent pattern! Very detailed instructions and easy to follow. Made my first pair of shoes successfully.",
    date: "2024-12-15",
    verified: true,
  },
  {
    id: "review-2",
    userName: "John D.",
    rating: 4,
    comment: "Great quality pattern. Some steps could be clearer, but overall very helpful.",
    date: "2024-12-10",
    verified: true,
  },
  {
    id: "review-3",
    userName: "Emma L.",
    rating: 5,
    comment: "Perfect for beginners! The step-by-step guide made it so easy. Highly recommend!",
    date: "2024-12-05",
    verified: false,
  },
]

export function ProductReviews({ productId }: ProductReviewsProps) {
  const [reviews] = useState<Review[]>(mockReviews)
  const [showForm, setShowForm] = useState(false)
  const [newReview, setNewReview] = useState({ rating: 5, comment: "", userName: "" })

  const averageRating = reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
  const ratingCounts = [5, 4, 3, 2, 1].map((rating) => ({
    rating,
    count: reviews.filter((r) => r.rating === rating).length,
  }))

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault()
    // In demo mode, just show a toast
    alert("Review submitted! (Demo mode - review not saved)")
    setShowForm(false)
    setNewReview({ rating: 5, comment: "", userName: "" })
  }

  return (
    <div className="mt-16 pt-16 border-t">
      <div className="flex items-start justify-between mb-8">
        <div>
          <h2 className="text-2xl font-semibold mb-2">Customer Reviews</h2>
          <div className="flex items-center gap-2">
            <div className="flex items-center">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  className={`h-5 w-5 ${
                    star <= Math.round(averageRating)
                      ? "fill-yellow-400 text-yellow-400"
                      : "text-muted-foreground"
                  }`}
                />
              ))}
            </div>
            <span className="text-lg font-semibold ml-2">{averageRating.toFixed(1)}</span>
            <span className="text-muted-foreground ml-2">({reviews.length} reviews)</span>
          </div>
        </div>
        <Button onClick={() => setShowForm(!showForm)} variant="outline">
          Write a Review
        </Button>
      </div>

      {/* Review Form */}
      {showForm && (
        <Card className="mb-8 border-2">
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-4">Write a Review</h3>
            <form onSubmit={handleSubmitReview} className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-2 block">Your Name</label>
                <Input
                  value={newReview.userName}
                  onChange={(e) => setNewReview({ ...newReview, userName: e.target.value })}
                  placeholder="Enter your name"
                  required
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">Rating</label>
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setNewReview({ ...newReview, rating: star })}
                      className="focus:outline-none"
                    >
                      <Star
                        className={`h-6 w-6 ${
                          star <= newReview.rating
                            ? "fill-yellow-400 text-yellow-400"
                            : "text-muted-foreground"
                        }`}
                      />
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">Your Review</label>
                <textarea
                  value={newReview.comment}
                  onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
                  placeholder="Share your experience..."
                  className="w-full min-h-[100px] px-3 py-2 border rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-ring"
                  required
                />
              </div>
              <div className="flex gap-2">
                <Button type="submit">Submit Review</Button>
                <Button type="button" variant="outline" onClick={() => setShowForm(false)}>
                  Cancel
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      {/* Rating Breakdown */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
        <div className="md:col-span-1">
          <h3 className="text-lg font-semibold mb-4">Rating Breakdown</h3>
          <div className="space-y-2">
            {ratingCounts.reverse().map(({ rating, count }) => (
              <div key={rating} className="flex items-center gap-2">
                <span className="text-sm w-12">{rating} star</span>
                <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                  <div
                    className="h-full bg-yellow-400"
                    style={{ width: `${(count / reviews.length) * 100}%` }}
                  />
                </div>
                <span className="text-sm text-muted-foreground w-8">{count}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="md:col-span-2">
          {/* Reviews List */}
          <div className="space-y-6">
            {reviews.map((review) => (
              <Card key={review.id} className="border">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center">
                        <User className="h-5 w-5 text-muted-foreground" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-semibold">{review.userName}</span>
                          {review.verified && (
                            <Badge variant="secondary" className="text-xs">
                              Verified Purchase
                            </Badge>
                          )}
                        </div>
                        <div className="flex items-center gap-1 mt-1">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <Star
                              key={star}
                              className={`h-4 w-4 ${
                                star <= review.rating
                                  ? "fill-yellow-400 text-yellow-400"
                                  : "text-muted-foreground"
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                    <span className="text-sm text-muted-foreground">{review.date}</span>
                  </div>
                  <p className="text-muted-foreground leading-relaxed">{review.comment}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

