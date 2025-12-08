"use client"

import { useEffect, useRef } from "react"

import { useLivenessStore } from "#/contexts/liveness-store";

export function CameraView() {
  const videoRef = useRef<HTMLVideoElement>(null)

  const { stream, setStream, setError, setPhase } = useLivenessStore()

  useEffect(() => {
    let mounted = true

    const initCamera = async () => {
      try {
        setPhase("camera-init")
        const mediaStream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: "user" },
          audio: false,
        })

        if (!mounted) {
          // biome-ignore lint/complexity/noForEach: <explanation>
          mediaStream.getTracks().forEach((track) => track.stop())
          return
        }

        setStream(mediaStream)

        if (videoRef.current) {
          videoRef.current.srcObject = mediaStream
        }

        // Transition to commands phase after camera loads
        setTimeout(() => {
          if (mounted) {
            setPhase("commands")
          }
        }, 1000)
      } catch (err) {
        console.error("[v0] Camera access error:", err)
        setError("Camera access denied. Please allow camera permissions.")
      }
    }

    initCamera()

    return () => {
      mounted = false
      if (stream) {
        // biome-ignore lint/complexity/noForEach: <explanation>
        stream.getTracks().forEach((track) => track.stop())
      }
    }
  }, [])

  useEffect(() => {
    if (videoRef.current && stream) {
      videoRef.current.srcObject = stream
    }
  }, [stream])

  return (
    <div className="relative w-full flex items-center justify-center bg-white py-12">
      <div className="relative w-[43vh] h-[60vh]">
        {/* Oval mask for camera */}
        <div className="absolute inset-0 overflow-hidden rounded-[50%] border-accent border">
          <video ref={videoRef} autoPlay playsInline muted className="w-full h-full object-cover scale-x-[-1]" />
        </div>
      </div>
    </div>
  )
}
