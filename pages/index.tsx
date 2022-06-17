import type { NextPage } from "next";
import dynamic from "next/dynamic";
import "leaflet/dist/leaflet.css";
import { useEffect, useState } from "react";
import { XMLParser } from "fast-xml-parser";

const Map = dynamic(() => import("../components/Map"), { ssr: false });

const parser = new XMLParser({
  attributeNamePrefix: "@_",
  ignoreAttributes: false,
});

const Home: NextPage = () => {
  const [width, setWidth] = useState("0px");
  const [height, setHeight] = useState("0px");

  useEffect(() => {
    fetch("https://www.openstreetmap.org/api/0.6/relation/7592211").then(
      (response) => {
        response.text().then((text) => {
          const xml = parser
            .parse(text)
            .osm.relation.member.filter(
              (node: any) => node["@_type"] == "node"
            );
          console.log(xml);
        });
      }
    );

    const onResize = () => {
      setWidth(window.innerWidth + "px");
      setHeight(window.innerHeight + "px");
    };
    onResize();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return (
    <>
      <div style={{ width, height }}>
        <Map />
      </div>
    </>
  );
};

export default Home;
