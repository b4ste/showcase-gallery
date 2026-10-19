const MAX_SIZE = 1024 * 1024;
const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp"];

function ImageUpload({ image, onChange, onError }) {
  function handleFile(event) {
    const file = event.target.files?.[0];
    if (!file) return;
    if (!ALLOWED_TYPES.includes(file.type)) {
      onError("Choose a JPG, PNG, or WebP image.");
      event.target.value = "";
      return;
    }
    if (file.size > MAX_SIZE) {
      onError("Image is too large. Maximum size is 1 MB.");
      event.target.value = "";
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      onChange(String(reader.result));
      onError("");
    };
    reader.onerror = () => onError("Could not read that image. Try another file.");
    reader.readAsDataURL(file);
  }

  return <label className="flex h-48 cursor-pointer items-center justify-center overflow-hidden rounded-xl border-2 border-dashed border-slate-300 text-sm text-slate-500 transition hover:border-indigo-500 hover:bg-indigo-50 hover:text-indigo-600">
    {image ? <img src={image} alt="Product image preview" className="h-full w-full object-cover" /> : <span>+ Click to choose an image (JPG, PNG, WebP · max 1 MB)</span>}
    <input type="file" accept="image/jpeg,image/png,image/webp" onChange={handleFile} className="sr-only" aria-label="Product image" />
  </label>;
}

export default ImageUpload;
