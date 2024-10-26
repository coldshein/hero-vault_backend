const uploadImages = (req, res) => {
  if (!req.files || req.files.length === 0) {
    return res.status(400).json({ error: "No files uploaded" });
  }
  const fileUrls = req.files.map((file) => `/uploads/${file.filename}`);

  res.status(200).json({
    urls: fileUrls,
  });
};

module.exports = uploadImages;
  