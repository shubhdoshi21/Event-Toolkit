import React from "react";
import GallerySlider from "../components/GallerySlider";
import i1 from "../assets/images/download.jpeg";
import i2 from "../assets/images/download (1).jpeg";
import i3 from "../assets/images/download (2).jpeg";
import i4 from "../assets/images/download (3).jpeg";
import RegForm from "../components/RegForm";
import ReviewSlider from "../components/ReviewSlider";

const Registration = () => {
  return (
    <div className="bg-black min-h-screen w-full pt-20">
      <GallerySlider images={[i1, i2, i3, i4]} slides={2} height={500} />
      <p className="text-offwhite text-6xl pb-2 px-10 font-bold">XYZ VENUE</p>
      <div className=" bg-mauve w-[40%] h-[5px] mx-10 mb-10 rounded-full"></div>
      <div className="flex flex-col md:flex-row">
        <p className="text-grey px-10 my-10 w-[100%] md:w-[60%] text-xl">
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Qui culpa a
          laborum, impedit iusto fugit velit illum perferendis. Minus quo
          ratione velit ut quam labore voluptas voluptatibus ipsa impedit.
          Numquam rem reiciendis, porro saepe dolores iure voluptatibus enim
          culpa totam non voluptas dicta at commodi, facilis possimus ipsam,
          nostrum ad fugit ut ducimus quas molestiae consequatur earum aliquid!
          Rem nesciunt debitis perspiciatis culpa harum accusamus? Ratione,
          aliquid eos reiciendis, dolor tempore esse nesciunt ipsa repellendus
          quaerat ipsum commodi facere vel velit sint aspernatur voluptatum cum
          molestias eveniet. Dolore qui quod corporis nesciunt itaque maxime
          alias, vel, natus illum rem molestiae aperiam consequatur fugiat animi
          facere suscipit ducimus minima minus blanditiis nulla? Dicta cum rerum
          soluta perspiciatis, expedita rem atque molestias vitae doloremque
          accusantium, nulla tempore iusto eum. Placeat quo impedit iste quod ex
          tempora tempore fugiat quisquam. Eius, beatae? Maxime perferendis
          modi, dicta error voluptatum soluta in minus adipisci similique,
          labore harum, odit sit accusamus earum? Nesciunt voluptatum ullam
          saepe commodi ut natus, exercitationem itaque explicabo, autem esse
          perferendis. Eaque maiores placeat dolorum velit, eligendi praesentium
          quaerat harum ratione optio ducimus quia eum obcaecati ex unde qui
          provident sapiente voluptatum quo officiis. Laborum sit quo placeat
          harum, perspiciatis perferendis aperiam!
        </p>

        <RegForm />
      </div>
      <p className="text-offwhite text-6xl text-center mt-20 font-semibold">Reviews from user conducting event here!</p>
      <ReviewSlider />
      <p className="text-offwhite text-6xl text-center mt-20 font-semibold">CATERER</p>
      <GallerySlider
        images={[i1, i2, i3, i4, i1, i2]}
        slides={4}
        height={200}
      />

      <p className="text-offwhite text-6xl text-center mt-20 font-semibold">DECORATOR</p>
      <GallerySlider
        images={[i1, i2, i3, i4, i1, i2]}
        slides={4}
        height={200}
      />
    </div>
  );
};

export default Registration;
