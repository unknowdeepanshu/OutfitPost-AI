const generatePoster = async ({
  modelImage,
  productImage,
  category,
  platform,
  includeText,
  gender,
}) => {

  console.log("AI poster generation started");

  console.log({
    modelImage,
    productImage,
    category,
    platform,
    includeText,
    gender,
  });

  // Temporary mock AI response
  return {
    currentPosterImage: "mock-generated-poster.jpg",
    mergeImage: "mock-merge-image.jpg",
  };
};


export {
  generatePoster,
};