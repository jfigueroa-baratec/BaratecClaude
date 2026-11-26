import React from "react";
import { Img, staticFile } from "remotion";

/** Logo de Baratec Solar tal cual (sin deformar). */
export const Logo: React.FC<{ width?: number }> = ({ width = 440 }) => <Img src={staticFile("logo-baratec.png")} style={{ width, display: "block" }} />;
