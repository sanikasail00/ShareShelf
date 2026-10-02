import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
const API_URL =
  "https://ou73evrb3m.execute-api.ap-south-2.amazonaws.com/resources";

import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import {
  ArrowRight,
  BookOpen,
  Box,
  BriefcaseBusiness,
  CheckCircle2,
  ChevronDown,
  Heart,
  Laptop,
  MapPin,
  Menu,
  Package,
  Search,
  ShieldCheck,
  Sparkles,
  UserRound,
  Users,
  X,
} from "lucide-react";
import "./App.css";
import resources from "./data/resources";

import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import ResourceDetails from "./pages/ResourceDetails";
import AddResource from "./pages/AddResource";

const categories = [
  { name: "Books", icon: BookOpen },
  { name: "Electronics", icon: Laptop },
  { name: "College", icon: BriefcaseBusiness },
  { name: "Tools", icon: Package },
  { name: "Others", icon: Box },
];


function Home() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [menuOpen, setMenuOpen] = useState(false);

 const [allResources, setAllResources] = useState(resources);
const [loadingResources, setLoadingResources] = useState(true);

useEffect(() => {
  fetch(API_URL)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Failed to fetch resources");
      }

      return response.json();
    })
    .then((data) => {
      if (data.success && Array.isArray(data.resources)) {
        setAllResources(data.resources);
      }
    })
    .catch((error) => {
      console.error("Error loading resources:", error);
    })
    .finally(() => {
      setLoadingResources(false);
    });
}, []);

const filteredResources = useMemo(() => {
  return allResources.filter((item) => {
    const matchesCategory =
      activeCategory === "All" || item.category === activeCategory;

    const searchText = search.toLowerCase();

    const matchesSearch =
      item.title.toLowerCase().includes(searchText) ||
      item.category.toLowerCase().includes(searchText) ||
      item.location.toLowerCase().includes(searchText);

    return matchesCategory && matchesSearch;
  });
}, [allResources, search, activeCategory]);

  const scrollToResources = () => {
    document
      .getElementById("resources")
      ?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="app">
      {/* NAVBAR */}
      <header className="navbar">
        <div className="nav-inner">
          <button
  className="brand brand-button"
  onClick={() => navigate("/")}
>
            <div className="brand-mark">
              <span>SS</span>
            </div>

            <div>
              <div className="brand-name">ShareShelf</div>
              <div className="brand-tagline">Share. Reuse. Connect.</div>
            </div>
          </button>

          <nav className={`nav-links ${menuOpen ? "open" : ""}`}>
            <a href="#resources" onClick={() => setMenuOpen(false)}>
              Explore
            </a>
            <a href="#how-it-works" onClick={() => setMenuOpen(false)}>
              How it works
            </a>
            <a href="#impact" onClick={() => setMenuOpen(false)}>
              Our impact
            </a>
          </nav>

          <div className="nav-actions">
            <button
  className="login-btn"
  onClick={() => navigate("/signin")}
>
  <UserRound size={17} />
  Sign in
</button>

            <button className="share-btn" onClick={() => navigate("/add-resource")}>
              Share an item
              <ArrowRight size={16} />
            </button>
          </div>

          <button
            className="mobile-menu"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </header>

      {/* HERO */}
      <main>
        <section className="hero">
          <div className="hero-glow glow-one"></div>
          <div className="hero-glow glow-two"></div>

          <div className="hero-inner">
            <div className="hero-copy">
              <div className="eyebrow">
                <Sparkles size={15} />
                A smarter way to share resources
              </div>

              <h1>
                What you don't need
                <span> could be useful to someone.</span>
              </h1>

              <p className="hero-description">
                Share books, electronics, tools and everyday resources with
                people in your community. Give useful things a second life
                instead of letting them sit unused.
              </p>

              <div className="hero-buttons">
                <button className="primary-btn" onClick={scrollToResources}>
                  Explore resources
                  <ArrowRight size={18} />
                </button>

                <button
                  className="secondary-btn"
                  onClick={() =>
                    document
                      .getElementById("how-it-works")
                      ?.scrollIntoView({ behavior: "smooth" })
                  }
                >
                  See how it works
                </button>
              </div>

              <div className="hero-trust">
                <div className="avatar-stack">
                  <span className="avatar avatar-one">A</span>
                  <span className="avatar avatar-two">R</span>
                  <span className="avatar avatar-three">M</span>
                  <span className="avatar avatar-four">S</span>
                </div>

                <div>
                  <strong>Growing community</strong>
                  <p>People sharing resources, one item at a time.</p>
                </div>
              </div>
            </div>

            <div className="hero-card-wrap">
              <div className="floating-label label-top">
                <CheckCircle2 size={17} />
                <div>
                  <strong>Item reused</strong>
                  <span>Just now</span>
                </div>
              </div>

              <div className="hero-resource-card">
                <div className="resource-visual hero-visual">
                  <BookOpen size={58} strokeWidth={1.4} />
                  <div className="visual-label">BOOK</div>
                </div>

                <div className="hero-card-content">
                  <div className="small-label">RECENTLY SHARED</div>
                  <h3>Web Development Handbook</h3>

                  <div className="card-meta">
                    <span>
                      <MapPin size={14} />
                      Mysuru
                    </span>

                    <span className="available-dot">
                      <i></i>
                      Available
                    </span>
                  </div>

                  <div className="owner-row">
                    <div className="owner-avatar">N</div>
                    <div>
                      <span>Shared by</span>
                      <strong>Neha</strong>
                    </div>

                    <Heart size={19} className="heart-icon" />
                  </div>
                </div>
              </div>

              <div className="floating-label label-bottom">
                <Users size={17} />
                <div>
                  <strong>Community first</strong>
                  <span>Share what matters</span>
                </div>
              </div>
            </div>
          </div>
        </section>

   {/* STATS */}     
        
        {/* RESOURCES */}
        <section className="resources-section" id="resources">
          <div className="section-container">
            <div className="section-heading">
              <div>
                <div className="section-kicker">EXPLORE THE COMMUNITY</div>
                <h2>Find something useful.</h2>
                <p>
                  Browse resources shared by people around you.
                </p>
              </div>

              <button className="view-all-btn" onClick={scrollToResources}>
                View all
                <ArrowRight size={16} />
              </button>
            </div>

            {/* SEARCH */}
            <div className="search-area">
              <div className="search-box">
                <Search size={20} />
                <input
                  type="text"
                  placeholder="Search books, electronics, tools..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />

                {search && (
                  <button
                    className="clear-search"
                    onClick={() => setSearch("")}
                  >
                    <X size={16} />
                  </button>
                )}
              </div>

              <button className="filter-btn">
                Filters
                <ChevronDown size={16} />
              </button>
            </div>

            {/* CATEGORIES */}
            <div className="category-row">
              <button
                className={`category-pill ${
                  activeCategory === "All" ? "active" : ""
                }`}
                onClick={() => setActiveCategory("All")}
              >
                All resources
              </button>

              {categories.map((category) => {
                const Icon = category.icon;

                return (
                  <button
                    key={category.name}
                    className={`category-pill ${
                      activeCategory === category.name ? "active" : ""
                    }`}
                    onClick={() => setActiveCategory(category.name)}
                  >
                    <Icon size={16} />
                    {category.name}
                  </button>
                );
              })}
            </div>

            {/* RESOURCE GRID */}
            <div className="resource-grid">
              {filteredResources.map((item) => (
                <article
  className="resource-card"
  key={item.id}
  onClick={() => navigate(`/resource/${item.resourceId || item.id}`)}
>
                  <div className="resource-image">
  <img
    src={item.image}
    alt={item.title}
  />

  <span className="image-category">
    {item.category}
  </span>
</div>

                  <div className="resource-body">
                    <div className="resource-top">
                      <span className="condition">{item.condition}</span>

                      <button className="heart-button" aria-label="Save item">
                        <Heart size={17} />
                      </button>
                    </div>

                    <h3>{item.title}</h3>

                    <p>{item.description}</p>

                    <div className="resource-location">
                      <MapPin size={15} />
                      {item.location}
                    </div>

                    <div className="resource-footer">
                      <div className="mini-owner">
                        <span className={`mini-avatar ${item.color}`}>
                          {item.initials}
                        </span>

                        <div>
                          <small>Shared by</small>
                          <strong>{item.owner}</strong>
                        </div>
                      </div>

                      <span className="available-badge">
                        Available
                      </span>
                    </div>
                  </div>
                </article>
              ))}
            </div>

            {filteredResources.length === 0 && (
              <div className="empty-state">
                <Search size={32} />
                <h3>No resources found</h3>
                <p>
                  Try a different search term or choose another category.
                </p>

                <button
                  onClick={() => {
                    setSearch("");
                    setActiveCategory("All");
                  }}
                >
                  Clear filters
                </button>
              </div>
            )}
          </div>
        </section>

        {/* HOW IT WORKS */}
        <section className="how-section" id="how-it-works">
          <div className="section-container">
            <div className="center-heading">
              <div className="section-kicker">SIMPLE BY DESIGN</div>
              <h2>Sharing should be easy.</h2>
              <p>
                Three simple steps turn unused resources into something useful.
              </p>
            </div>

            <div className="steps-grid">
              <div className="step-card">
                <div className="step-number">01</div>
                <div className="step-icon">
                  <Package size={24} />
                </div>
                <h3>List what you have</h3>
                <p>
                  Add an item you no longer need and tell the community a
                  little about it.
                </p>
              </div>

              <div className="step-connector"></div>

              <div className="step-card">
                <div className="step-number">02</div>
                <div className="step-icon">
                  <Search size={24} />
                </div>
                <h3>Find what you need</h3>
                <p>
                  Search nearby resources using categories and simple filters.
                </p>
              </div>

              <div className="step-connector"></div>

              <div className="step-card">
                <div className="step-number">03</div>
                <div className="step-icon">
                  <Users size={24} />
                </div>
                <h3>Connect & reuse</h3>
                <p>
                  Request the item and connect with the person who shared it.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* IMPACT */}
        <section className="impact-section" id="impact">
          <div className="section-container">
            <div className="impact-card">
              <div className="impact-content">
                <div className="section-kicker light">WHY SHARESHELF</div>

                <h2>
                  Small acts of sharing can create a
                  <span> bigger impact.</span>
                </h2>

                <p>
                  Every useful item that gets reused is one less item sitting
                  unused, one less unnecessary purchase, and one more
                  opportunity for someone in the community.
                </p>

                <div className="impact-points">
                  <div>
                    <CheckCircle2 size={19} />
                    <span>Encourages reuse</span>
                  </div>

                  <div>
                    <CheckCircle2 size={19} />
                    <span>Reduces unnecessary waste</span>
                  </div>

                  <div>
                    <CheckCircle2 size={19} />
                    <span>Builds community connections</span>
                  </div>
                </div>

                <button className="light-btn" onClick={scrollToResources}>
                  Start exploring
                  <ArrowRight size={17} />
                </button>
              </div>

              <div className="impact-visual">
                <div className="impact-circle circle-large"></div>
                <div className="impact-circle circle-medium"></div>
                <div className="impact-circle circle-small">
                  <Heart size={38} />
                </div>

                <div className="impact-floating-card">
                  <ShieldCheck size={19} />
                  <div>
                    <strong>Reuse matters</strong>
                    <span>One community at a time.</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="footer">
        <div className="footer-inner">
          <div>
            <div className="brand footer-brand">
              <div className="brand-mark">
                <span>SS</span>
              </div>

              <div>
                <div className="brand-name">ShareShelf</div>
                <div className="brand-tagline">Share. Reuse. Connect.</div>
              </div>
            </div>

            <p className="footer-description">
              A community platform for giving useful resources a second life.
            </p>
          </div>

          <div className="footer-links">
            <div>
              <strong>Platform</strong>
              <a href="#resources">Explore</a>
              <a href="#how-it-works">How it works</a>
              <a href="#impact">Our impact</a>
            </div>

            <div>
              <strong>Community</strong>
              <a href="#">Guidelines</a>
              <a href="#">Safety</a>
              <a href="#">Contact</a>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <span>© 2026 ShareShelf. Built for community sharing.</span>
          <span>Designed with purpose.</span>
        </div>
      </footer>
    </div>
  );
}


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signin" element={<SignIn />} />

  <Route path="/signup" element={<SignUp />} />
        <Route
          path="/resource/:id"
          element={<ResourceDetails />}
        />
        <Route path="/add-resource" element={<AddResource />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;