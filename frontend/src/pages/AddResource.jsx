import { useState } from "react";
import { ArrowLeft, ImagePlus, Package, MapPin, FileText } from "lucide-react";
import { useNavigate } from "react-router-dom";

function AddResource() {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("Books");
  const [condition, setCondition] = useState("Good");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");

  const handleImage = (e) => {
    const file = e.target.files?.[0];

    if (!file) return;

    if (file.size > 2 * 1024 * 1024) {
      alert("Please choose an image smaller than 2 MB.");
      return;
    }

    const reader = new FileReader();

    reader.onload = () => {
      setImage(reader.result);
    };

    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const savedUser =
      JSON.parse(localStorage.getItem("shareshelfUser")) || {};

    const response = await fetch(
      "https://ou73evrb3m.execute-api.ap-south-2.amazonaws.com/resources",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          category,
          condition,
          location,
          description,
          image,
          owner: savedUser.name || "You",
          initials: (savedUser.name || "You")
            .charAt(0)
            .toUpperCase(),
          color: "mint",
        }),
      }
    );

    const data = await response.json();

    if (!response.ok || !data.success) {
      throw new Error(
        data.message || "Failed to add resource"
      );
    }

    alert("Your resource has been added successfully!");

    navigate("/");
  } catch (error) {
    console.error("Error adding resource:", error);
    alert("Could not add the resource. Please try again.");
  }
};
  return (
    <div className="add-resource-page">
      <header className="add-resource-header">
        <button
          className="details-brand"
          onClick={() => navigate("/")}
        >
          <div className="brand-mark">
            <span>SS</span>
          </div>

          <div>
            <div className="brand-name">ShareShelf</div>
            <div className="brand-tagline">
              Share. Reuse. Connect.
            </div>
          </div>
        </button>
      </header>

      <main className="add-resource-container">
        <button
          className="details-back"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft size={17} />
          Back
        </button>

        <div className="add-resource-heading">
          <span className="section-kicker">
            GIVE IT A SECOND LIFE
          </span>

          <h1>Share something useful.</h1>

          <p>
            Add a resource that someone in your community could use.
          </p>
        </div>

        <form
          className="add-resource-form"
          onSubmit={handleSubmit}
        >
          <div className="image-upload-section">
            <label
              htmlFor="resource-image"
              className="image-upload"
            >
              {image ? (
                <img
                  src={image}
                  alt="Resource preview"
                />
              ) : (
                <>
                  <ImagePlus size={30} />
                  <strong>Add a photo</strong>
                  <span>JPG or PNG, up to 2 MB</span>
                </>
              )}
            </label>

            <input
              id="resource-image"
              type="file"
              accept="image/png,image/jpeg"
              onChange={handleImage}
              hidden
            />
          </div>

          <div className="resource-form-fields">
            <div className="form-group">
              <label htmlFor="title">Item name</label>

              <div className="input-wrapper">
                <Package size={18} />

                <input
                  id="title"
                  type="text"
                  placeholder="e.g. Engineering textbook"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="form-two-columns">
              <div className="form-group">
                <label htmlFor="category">Category</label>

                <select
                  id="category"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                >
                  <option>Books</option>
                  <option>Electronics</option>
                  <option>College</option>
                  <option>Tools</option>
                  <option>Others</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="condition">Condition</label>

                <select
                  id="condition"
                  value={condition}
                  onChange={(e) => setCondition(e.target.value)}
                >
                  <option>Like New</option>
                  <option>Good</option>
                  <option>Fair</option>
                </select>
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="location">Location</label>

              <div className="input-wrapper">
                <MapPin size={18} />

                <input
                  id="location"
                  type="text"
                  placeholder="e.g. Mysuru"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="description">Description</label>

              <div className="textarea-wrapper">
                <FileText size={18} />

                <textarea
                  id="description"
                  placeholder="Tell people a little about this item..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              className="publish-resource-button"
            >
              Publish resource
            </button>
          </div>
        </form>
      </main>
    </div>
  );
}

export default AddResource;