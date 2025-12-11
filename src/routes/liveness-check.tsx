"use client";

import { AlertCircle } from "lucide-react";

import { useLivenessStore } from "#/contexts/liveness-store";
import { Button } from "#/components/ui/button";
import { CameraView } from "#/components/CameraView";
import { CommandOverlay } from "#/components/command-overlay";
import { VerificationSteps } from "#/components/verification-steps";

export default function LivenessCheckPage() {
	const { phase, error, reset } = useLivenessStore();

	if (error) {
		return (
			<div className="min-h-screen flex items-center justify-center p-4 bg-white">
				<div className="max-w-md w-full space-y-6">
					<div className="bg-destructive/10 border border-destructive rounded-lg p-6 flex items-start gap-4">
						<AlertCircle className="w-6 h-6 text-destructive flex-shrink-0 mt-0.5" />

						<div className="space-y-2">
							<h3 className="font-semibold text-destructive">Camera Error</h3>

							<p className="text-sm text-destructive/90">{error}</p>
						</div>
					</div>

					<Button onClick={reset} className="w-full">
						Try Again
					</Button>
				</div>
			</div>
		);
	}

	return (
		<div className="min-h-screen flex items-center justify-center p-4 bg-white">
			<div className="max-w-2xl w-full space-y-6">
				{/* Header */}
				<div className="text-center space-y-2">
					<h1 className="text-3xl font-bold text-foreground">Liveness Check</h1>

					<p className="text-muted-foreground">
						{phase === "idle" || phase === "camera-init"
							? "Initializing camera..."
							: phase === "commands"
								? "Follow the instructions on screen"
								: phase === "liveness-complete"
									? "Liveness Check Completed"
									: phase === "verifying-id"
										? "Verifying your identity..."
										: "Verification Complete"}
					</p>
				</div>

				{/* Camera View */}
				{(phase === "idle" ||
					phase === "camera-init" ||
					phase === "commands") && (
					<div className="relative">
						<CameraView />

						<CommandOverlay />
					</div>
				)}

				{/* Verification Steps */}
				<VerificationSteps />

				{/* Complete State */}
				{phase === "complete" && (
					<div className="text-center space-y-4">
						<div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-success/10 text-success">
							<svg
								className="w-8 h-8"
								viewBox="0 0 24 24"
								stroke="green"
								fill="none"
							>
								<title>Check mark</title>

								<path
									strokeLinejoin="round"
									strokeLinecap="round"
									d="M5 13l4 4L19 7"
									strokeWidth={2}
								/>
							</svg>
						</div>

						<div className="space-y-2">
							<h2 className="text-2xl font-bold text-foreground">All Set!</h2>

							<p className="text-muted-foreground">
								Your identity has been successfully verified.
								<br />
								You can close
								this page.
							</p>
						</div>

						<Button onClick={reset} variant="outline">
							Start Over
						</Button>
					</div>
				)}
			</div>
		</div>
	);
}
