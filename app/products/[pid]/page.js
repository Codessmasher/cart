"use client"
import { useParams } from "next/navigation"

const page = () => {
    const { pid } = useParams();
  return (
    <div>{pid}</div>
  )
}

export default page