module.exports = {
  content: ["./views/**/*.ejs", "./views/components/*.ejs"], // Include all EJS files in the views folder
  theme: {
    extend: {
      colors: {
        darkPrimary: {
          a0: "#007a02",
          a10: "#348929",
          a20: "#519744",
          a30: "#6ba65e",
          a40: "#84b578",
          a50: "#9dc392",
        },
        darkSurface: {
          a0: "#000000",
          a10: "#1e1e1e",
          a20: "#353535",
          a30: "#4e4e4e",
          a40: "#696969",
          a50: "#858585",
        },
        darkSurfaceMixed: {
          a0: "#081204",
          a10: "#212820",
          a20: "#393f37",
          a30: "#525750",
          a40: "#6c716b",
          a50: "#888b86",
        },
      },
    },
  },
  plugins: [],
};
