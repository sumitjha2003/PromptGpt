import dynamic from 'next/dynamic'

const UpdatePromptClient = dynamic(() => import('./UpdatePromptClient'), { ssr: false })

export default function UpdatePromptPage() {
  return <UpdatePromptClient />
}