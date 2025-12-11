"use client";

import { useEffect } from "react";
import { Check, Loader2 } from "lucide-react";

import { useLivenessStore } from "#/contexts/liveness-store";

export function VerificationSteps() {
	const { phase, setPhase, stream } = useLivenessStore();

	useEffect(() => {
		if (phase === "liveness-complete") {
			const timer = setTimeout(() => {
				setPhase("verifying-id");
			}, 2000);
			return () => clearTimeout(timer);
		}

		if (phase === "verifying-id") {
			const timer = setTimeout(() => {
				setPhase("complete");
			}, 2000);
			return () => clearTimeout(timer);
		}

		if (phase === "complete") {
			// Clean up camera stream
			if (stream) {
				// biome-ignore lint/complexity/noForEach: <explanation>
				stream.getTracks().forEach((track) => track.stop());
			}
		}
	}, [phase, setPhase, stream]);

	if (
		phase !== "liveness-complete" &&
		phase !== "verifying-id" &&
		phase !== "complete"
	) {
		return null;
	}

	return (
		<div className="space-y-4">
			{/* Liveness Check Step */}
			<div className="flex items-center gap-3 p-4 bg-card border border-border rounded-lg">
				<div
					className={`flex-shrink-0 ${
						phase === "liveness-complete" ||
						phase === "verifying-id" ||
						phase === "complete"
							? "text-success"
							: "text-muted-foreground"
					}`}
				>
					{phase === "liveness-complete" ||
					phase === "verifying-id" ||
					phase === "complete" ? (
						<Check className="w-6 h-6 text-green-800" />
					) : (
						<Loader2 className="w-6 h-6 animate-spin" />
					)}
				</div>

				<div>
					<p className="font-medium text-foreground">Liveness Check Complete</p>

					<p className="text-sm text-muted-foreground">Real human verified</p>
				</div>
			</div>

			{/* Identity Verification Step */}
			{(phase === "verifying-id" || phase === "complete") && (
				<div className="flex items-center gap-3 p-4 bg-card border border-border rounded-lg">
					<div
						className={`flex-shrink-0 ${phase === "complete" ? "text-success" : "text-muted-foreground"}`}
					>
						{phase === "complete" ? (
							<Check className="w-6 h-6 text-green-800" />
						) : (
							<Loader2 className="w-6 h-6 animate-spin" />
						)}
					</div>

					<div>
						<p className="font-medium text-foreground">
							{phase === "complete"
								? "Verifiying ID..."
								: "Identity Verification Complete"}
						</p>

						<p className="text-sm text-muted-foreground">
							{phase === "complete"
								? "ID matched successfully"
								: "Matching with ID image..."}
						</p>
					</div>
				</div>
			)}
		</div>
	);
}
