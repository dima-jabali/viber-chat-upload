import { Check, Loader2, Upload, XCircle } from "lucide-react";
import { useEffect, useRef, useState } from "react";

import { useRoute } from "#/hooks/url/use-thing-to-upload";

export function UploadIds() {
	const [route] = useRoute();

	const [previewUrl, setPreviewUrl] = useState<string | null>(null);
	const [file, setFile] = useState<File | null>(null);
	const [uploadStatus, setUploadStatus] = useState<
		"idle" | "uploading" | "success" | "error"
	>("idle");

	// Ref to the input element to trigger a click programmatically
	const fileInputRef = useRef<HTMLInputElement>(null);

	// Clean up the object URL to prevent memory leaks
	useEffect(() => {
		return () => {
			if (previewUrl) {
				URL.revokeObjectURL(previewUrl);
			}
		};
	}, [previewUrl]);

	// Handle file selection
	const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const selectedFile = e.target.files?.[0];
		if (selectedFile) {
			setFile(selectedFile);
			setPreviewUrl(URL.createObjectURL(selectedFile));
			// Start the fake upload process
			setUploadStatus("uploading");
			setTimeout(() => {
				setUploadStatus("success");
			}, 3000); // Simulate a 3-second upload
		}
	};

	// Reset the component state
	const resetComponent = () => {
		if (previewUrl) {
			URL.revokeObjectURL(previewUrl);
		}
		setFile(null);
		setPreviewUrl(null);
		setUploadStatus("idle");
		if (fileInputRef.current) {
			fileInputRef.current.value = ""; // Clear the input value
		}
	};

	// Function to render the correct upload message and icon
	const renderUploadStatus = () => {
		switch (uploadStatus) {
			case "uploading":
				return (
					<div className="flex items-center text-blue-500 font-semibold gap-2">
						<Loader2 className="size-5 animate-spin" />
						<span>Uploading...</span>
					</div>
				);
			case "success":
				return (
					<div className="flex flex-col items-center text-green-700 font-semibold">
						<div className="flex items-center gap-2">
							<Check className="size-5" />

							<span>Upload Successful!</span>
						</div>

						<span className="text-xs pl-6">You can close this page.</span>
					</div>
				);
			case "error":
				return (
					<div className="flex items-center text-red-500 font-semibold gap-2">
						<XCircle className="size-5" />
						<span>Upload Failed</span>
					</div>
				);
			default:
				return null;
		}
	};

	return (
		<div className="h-screen w-screen bg-gray-100 dark:bg-gray-900 flex flex-col gap-8 items-center justify-center p-4">
			<title>Upload</title>

			<div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-xl max-w-lg w-full flex flex-col items-center gap-6">
				<h1 className="text-2xl font-bold text-gray-800 dark:text-white text-center">
					Upload your <i className="underline">{route}</i> photo
				</h1>

				{/* Conditional rendering based on whether a file is selected */}
				{!file ? (
					// Initial upload dropzone
					<label
						htmlFor="dropzone-file"
						className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:border-gray-600 dark:hover:border-gray-500 transition-colors duration-200 ease-in-out"
					>
						<div className="flex flex-col items-center justify-center pt-5 pb-6">
							<Upload
								className="w-10 h-10 mb-4 text-gray-400 dark:text-gray-300"
								aria-hidden="true"
							/>
							<p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
								<span className="font-semibold">Click to upload</span> or drag
								and drop
							</p>
							<p className="text-xs text-gray-500 dark:text-gray-400">
								SVG, PNG, JPG or GIF (MAX. 800x400px)
							</p>
						</div>
						<input
							onChange={handleFileChange}
							id="dropzone-file"
							className="hidden"
							ref={fileInputRef}
							accept="image/*"
							type="file"
						/>
					</label>
				) : (
					// File preview and status display
					<div className="w-full flex flex-col items-center gap-4">
						<div className="relative w-full rounded-xl overflow-hidden shadow-md">
							{previewUrl && (
								<div className="flex items-center justify-center">
									<img
										className="w-[80%] h-auto object-cover"
										src={previewUrl}
										alt="Preview"
									/>
								</div>
							)}
							{/* Overlay for file details and actions */}
							<div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center transition-opacity duration-200 opacity-0 hover:opacity-100">
								<div className="text-white text-center">
									<p className="font-semibold">{file.name}</p>
									<p className="text-sm">{(file.size / 1024).toFixed(2)} KB</p>
								</div>
							</div>
						</div>

						{/* Status and Action Buttons */}
						<div className="w-full flex items-center justify-between mt-2 px-2">
							{renderUploadStatus()}
							<button
								className="p-2 text-sm font-medium rounded-lg flex items-center gap-2 hover:bg-red-100 dark:hover:bg-red-900 transition-colors duration-200"
								aria-label="Remove and reset"
								onClick={resetComponent}
								type="button"
							>
								<XCircle className="h-5 w-5 inline-block" />
								Remove
							</button>
						</div>
					</div>
				)}
			</div>
		</div>
	);
}
