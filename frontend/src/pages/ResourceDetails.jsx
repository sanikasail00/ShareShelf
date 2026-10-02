import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  ArrowLeft,
  MapPin,
  CheckCircle2,
  Heart,
  Send,
} from "lucide-react";

const API_URL =
  "https://ou73evrb3m.execute-api.ap-south-2.amazonaws.com/resources";

function ResourceDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [resource, setResource] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(API_URL)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to load resources");
        }

        return response.json();
      })
      .then((data) => {
        const foundResource = data.resources?.find(
          (item) =>
            item.id === id ||
            item.resourceId === id
        );

        setResource(foundResource || null);
      })
      .catch((error) => {
        console.error("Error loading resource:", error);
        setResource(null);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <div className="details-not-found">
        <h1>Loading resource...</h1>
      </div>
    );
  }

  if (!resource) {
    return (
      <div className="details-not-found">
        <h1>Resource not found</h1>

        <p>
          The resource you're looking for doesn't exist.
        </p>

        <button onClick={() => navigate("/")}>
          Back to ShareShelf
        </button>
      </div>
    );
  }

 const handleRequest = async () => {
  try {
    const savedUser = JSON.parse(
      localStorage.getItem("shareshelfUser") || "{}"
    );

    const response = await fetch(
      "https://ou73evrb3m.execute-api.ap-south-2.amazonaws.com/requests",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          resourceId: resource.resourceId,
          resourceTitle: resource.title,
          requester: savedUser.name || "Community Member",
        }),
      }
    );

    const data = await response.json();

    if (!response.ok || !data.success) {
      throw new Error(data.message || "Request failed");
    }

    alert("Request submitted successfully!");
  } catch (error) {
    console.error("Request error:", error);
    alert("Could not submit request. Please try again.");
  }
};

  return (
    <div className="resource-details-page">

      {/* HEADER */}

      <header className="details-navbar">

        <button
          className="details-brand"
          onClick={() => navigate("/")}
        >
          <div className="brand-mark">
            <span>SS</span>
          </div>

          <div>
            <div className="brand-name">
              ShareShelf
            </div>

            <div className="brand-tagline">
              Share. Reuse. Connect.
            </div>
          </div>
        </button>

      </header>

      {/* CONTENT */}

      <main className="details-container">

        <button
          className="details-back"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft size={17} />
          Back to resources
        </button>

        <div className="details-layout">

          {/* IMAGE */}

          <div className="details-image-card">

            {resource.image ? (
              <img
                src={resource.image}
                alt={resource.title}
              />
            ) : (
              <div className="details-image-placeholder">
                <span>{resource.category}</span>
              </div>
            )}

            <button className="details-heart">
              <Heart size={20} />
            </button>

          </div>

          {/* INFORMATION */}

          <div className="details-main">

            <div className="details-badges">

              <span className="details-category-badge">
                {resource.category}
              </span>

              <span className="details-condition-badge">
                {resource.condition}
              </span>

            </div>

            <h1>{resource.title}</h1>

            <p className="details-description">
              {resource.description}
            </p>

            <div className="details-location">

              <MapPin size={18} />

              <span>{resource.location}</span>

            </div>

            <div className="details-owner-row">

              <div
                className={`details-owner-avatar ${
                  resource.color || "mint"
                }`}
              >
                {resource.initials || "C"}
              </div>

              <div>
                <span>Shared by</span>
                <strong>{resource.owner}</strong>
              </div>

              <span className="details-available">
                <CheckCircle2 size={15} />
                {resource.availability || "Available"}
              </span>

            </div>

            <button
              className="details-request-button"
              onClick={handleRequest}
            >
              <Send size={17} />
              Request this item
            </button>

          </div>

        </div>

        {/* LOWER INFORMATION */}

        <div className="details-bottom-grid">

          <section className="details-info-card">

            <h2>About this resource</h2>

            <p>
              {resource.description}
            </p>

            <div className="detail-divider"></div>

            <h3>Resource details</h3>

            <div className="detail-list">

              <div>
                <span>Category</span>
                <strong>{resource.category}</strong>
              </div>

              <div>
                <span>Condition</span>
                <strong>{resource.condition}</strong>
              </div>

              <div>
                <span>Location</span>
                <strong>{resource.location}</strong>
              </div>

              <div>
                <span>Shared by</span>
                <strong>{resource.owner}</strong>
              </div>

            </div>

          </section>

          <section className="details-owner-card">

            <h2>About the owner</h2>

            <div className="owner-profile">

              <div
                className={`details-owner-avatar ${
                  resource.color || "mint"
                }`}
              >
                {resource.initials || "C"}
              </div>

              <div>
                <strong>{resource.owner}</strong>
                <span>ShareShelf member</span>
              </div>

            </div>

            <p>
              This resource has been shared with the
              community for someone else to use.
            </p>

          </section>

        </div>

      </main>
    </div>
  );
}

export default ResourceDetails;