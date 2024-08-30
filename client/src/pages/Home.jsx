import React, { useState, useRef } from "react";
import {Navbar, Modal, ModalButton, LocationCard, Footer, ReviewCard, Carousal, Sidebar} from "../components/index.js"

const Home = () => {
  const modalConfigs = [
    {
      id: "Agra",
      title: "Agra",
      content:
        "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sit, aliquid natus illo aliquam autem rerum fugiat perferendis totam enim optio dolorum quasi animi delectus accusamus assumenda consequuntur adipisci iusto vero. Placeat ducimus reiciendis numquam sunt. Repellendus fugit ullam libero fuga eveniet doloribus. Fugiat, numquam recusandae.",
      image:
        "https://imgs.search.brave.com/VSRlleNOw75OCz3Eh-mDotX0sOSSReg7Xyhl70wv85E/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9jZG4u/cGl4YWJheS5jb20v/cGhvdG8vMjAxOS8w/My8xMi8yMC8xOS9p/bmRpYS00MDUxNzUz/XzY0MC5qcGc",
    },
    {
      id: "Delhi1",
      title: "Delhi1",
      content: "This is the content for Delhi1.",
      image:
        "https://imgs.search.brave.com/VSRlleNOw75OCz3Eh-mDotX0sOSSReg7Xyhl70wv85E/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9jZG4u/cGl4YWJheS5jb20v/cGhvdG8vMjAxOS8w/My8xMi8yMC8xOS9p/bmRpYS00MDUxNzUz/XzY0MC5qcGc",
    },
    {
      id: "Mumbai",
      title: "Mumbai",
      content: "This is the content for Mumbai.",
      image:
        "https://imgs.search.brave.com/VSRlleNOw75OCz3Eh-mDotX0sOSSReg7Xyhl70wv85E/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9jZG4u/cGl4YWJheS5jb20v/cGhvdG8vMjAxOS8w/My8xMi8yMC8xOS9p/bmRpYS00MDUxNzUz/XzY0MC5qcGc",
    },
    {
      id: "Kolkata",
      title: "Kolkata",
      content: "This is the content for Kolkata.",
      image:
        "https://imgs.search.brave.com/VSRlleNOw75OCz3Eh-mDotX0sOSSReg7Xyhl70wv85E/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9jZG4u/cGl4YWJheS5jb20v/cGhvdG8vMjAxOS8w/My8xMi8yMC8xOS9p/bmRpYS00MDUxNzUz/XzY0MC5qcGc",
    },
    {
      id: "Chennai",
      title: "Chennai",
      content: "This is the content for Chennai.",
      image:
        "https://imgs.search.brave.com/VSRlleNOw75OCz3Eh-mDotX0sOSSReg7Xyhl70wv85E/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9jZG4u/cGl4YWJheS5jb20v/cGhvdG8vMjAxOS8w/My8xMi8yMC8xOS9p/bmRpYS00MDUxNzUz/XzY0MC5qcGc",
    },
    {
      id: "Bangalore",
      title: "Bangalore",
      content: "This is the content for Bangalore.",
      image:
        "https://imgs.search.brave.com/VSRlleNOw75OCz3Eh-mDotX0sOSSReg7Xyhl70wv85E/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9jZG4u/cGl4YWJheS5jb20v/cGhvdG8vMjAxOS8w/My8xMi8yMC8xOS9p/bmRpYS00MDUxNzUz/XzY0MC5qcGc",
    },
    {
      id: "Ahmedabad",
      title: "Ahmedabad",
      content: "This is the content for Ahmedabad.",
      image:
        "https://imgs.search.brave.com/VSRlleNOw75OCz3Eh-mDotX0sOSSReg7Xyhl70wv85E/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9jZG4u/cGl4YWJheS5jb20v/cGhvdG8vMjAxOS8w/My8xMi8yMC8xOS9p/bmRpYS00MDUxNzUz/XzY0MC5qcGc",
    },
    {
      id: "Surat",
      title: "Surat",
      content: "This is the content for Surat.",
      image:
        "https://imgs.search.brave.com/VSRlleNOw75OCz3Eh-mDotX0sOSSReg7Xyhl70wv85E/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9jZG4u/cGl4YWJheS5jb20v/cGhvdG8vMjAxOS8w/My8xMi8yMC8xOS9p/bmRpYS00MDUxNzUz/XzY0MC5qcGc",
    },
  ];

  const reviews = [
    {
      id: "1",
      user: "John Doe",
      rating: 5,
      content:
        "Agra was an amazing experience! The Taj Mahal is truly a wonder of the world. Highly recommend visiting.",
    },
    {
      id: "1",
      user: "John Doe",
      rating: 5,
      content:
        "Agra was an amazing experience! The Taj Mahal is truly a wonder of the world. Highly recommend visiting.",
    },
    {
      id: "1",
      user: "John Doe",
      rating: 5,
      content:
        "Agra was an amazing experience! The Taj Mahal is truly a wonder of the world. Highly recommend visiting.",
    },
    {
      id: "1",
      user: "John Doe",
      rating: 5,
      content:
        "Agra was an amazing experience! The Taj Mahal is truly a wonder of the world. Highly recommend visiting.",
    },
    {
      id: "1",
      user: "John Doe",
      rating: 5,
      content:
        "Agra was an amazing experience! The Taj Mahal is truly a wonder of the world. Highly recommend visiting.",
    },
    {
      id: "2",
      user: "Jane Smith",
      rating: 4,
      content:
        "Delhi has a rich history and vibrant culture. Enjoyed the street food and monuments. Will visit again!",
    },
    {
      id: "3",
      user: "Sam Wilson",
      rating: 4.5,
      content:
        "Mumbai's energy is contagious! The city never sleeps. Loved the marine drive and the local markets.",
    },
  ];

  const images = [
    {
      src: "https://imgs.search.brave.com/VSRlleNOw75OCz3Eh-mDotX0sOSSReg7Xyhl70wv85E/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9jZG4u/cGl4YWJheS5jb20v/cGhvdG8vMjAxOS8w/My8xMi8yMC8xOS9p/bmRpYS00MDUxNzUz/XzY0MC5qcGc",
      alt: "Event 1",
    },
    {
      src: "https://imgs.search.brave.com/VSRlleNOw75OCz3Eh-mDotX0sOSSReg7Xyhl70wv85E/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9jZG4u/cGl4YWJheS5jb20v/cGhvdG8vMjAxOS8w/My8xMi8yMC8xOS9p/bmRpYS00MDUxNzUz/XzY0MC5qcGc",
      alt: "Event 2",
    },
    {
      src: "https://imgs.search.brave.com/VSRlleNOw75OCz3Eh-mDotX0sOSSReg7Xyhl70wv85E/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9jZG4u/cGl4YWJheS5jb20v/cGhvdG8vMjAxOS8w/My8xMi8yMC8xOS9p/bmRpYS00MDUxNzUz/XzY0MC5qcGc",
      alt: "Event 3",
    },
  ];

  const [openModals, setOpenModals] = useState({});
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const containerRef = useRef(null);

  const openModal = (modalId) => {
    setOpenModals({ ...openModals, [modalId]: true });
  };

  const closeModal = (modalId) => {
    setOpenModals({ ...openModals, [modalId]: false });
  };

  const scroll = (direction) => {
    if (containerRef.current) {
      const scrollAmount = direction === "left" ? -200 : 200;
      containerRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="min-h-screen text-white">
      <Navbar onSidebarToggle={toggleSidebar} />
      <Sidebar isOpen={isSidebarOpen} onClose={toggleSidebar} />

      {/* Modals for diff cities */}
      <div className="flex items-center justify-center py-6 mt-12 relative">
        <button
          onClick={() => scroll("left")}
          className="absolute left-4 z-10 bg-gray-600 text-white p-2 rounded-full text-2xl font-bold hover:bg-gray-500 transition-colors"
        >
          &lt;
        </button>
        <div
          ref={containerRef}
          className="flex gap-4 p-4 overflow-x-auto hide-scrollbar"
          style={{ maxHeight: "200px", whiteSpace: "nowrap" }}
        >
          {modalConfigs.map((modal) => (
            <ModalButton
              key={modal.id}
              modal={modal}
              onClick={() => openModal(modal.id)}
            />
          ))}
        </div>
        <button
          onClick={() => scroll("right")}
          className="absolute right-4 bg-gray-600 text-white p-2 rounded-full text-2xl font-bold hover:bg-gray-500 transition-colors"
        >
          &gt;
        </button>

        {modalConfigs.map((modal) => (
          <Modal
            key={modal.id}
            isOpen={openModals[modal.id]}
            onClose={() => closeModal(modal.id)}
            title={modal.title}
          >
            <img
              src={modal.image}
              alt={modal.title}
              className=" min-w-90 min-h"
            />
            <p className="text-black mt-2">{modal.content}</p>
          </Modal>
        ))}
      </div>

      {/* images carousal */}
      <div className="py-8">
        <h2 className="text-3xl font-bold mb-6 text-center">Recent Events</h2>
        <Carousal images={images} />
      </div>

      {/* exploring locations */}
      <div className="py-8 px-4">
        <h2 className="text-3xl font-bold mb-6 text-left">
          Explore Locations at Your City
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {modalConfigs.map((modal) => (
            <LocationCard modal={modal} />
          ))}
        </div>
      </div>

      {/* reviews */}
      <div className="py-8 px-4 bg-gray-900">
        <h2 className="text-3xl font-bold mb-6 text-center">Latest Reviews</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {reviews.map((review) => (
            <ReviewCard review={review} />
          ))}
        </div>
      </div>

      {/* footer */}
      <Footer />
    </div>
  );
};

export default Home;
