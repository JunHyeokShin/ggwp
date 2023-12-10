import Image from 'next/image'
import Link from 'next/link'
const collaborators = require('@/public/data/collaborator.json')

export default function AboutUsPage() {
  return (
    <div className="grid grid-cols-2 m-3 gap-3">
      {collaborators.map((collaborator) => (
        <div
          key={collaborator.id}
          className="flex flex-col p-4 rounded-lg shadow-md
          bg-surface-container-light dark:bg-surface-container-dark
          text-on-surface-light dark:text-on-surface-dark"
        >
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <div>
                <Image
                  src={`${collaborator.github_profile_image_url}`}
                  width={96}
                  height={96}
                  alt={'JunHyeokShin'}
                  className="rounded-full"
                />
              </div>
              <div className="flex flex-col mx-4">
                <h1 className="text-5xl font-black tracking-wide leading-none">
                  {collaborator.name}
                </h1>
                <p
                  className="font-light tracking-wide
                text-on-surface-variant-light dark:text-on-surface-variant-dark"
                >
                  {collaborator.github_id} &#40;{collaborator.github_nickname}
                  &#41;
                </p>
              </div>
            </div>
            <div className="flex items-end">
              <Link href={`${collaborator.github_url}`}>
                <button
                  type="submit"
                  className="h-10 shadow-md rounded-full bg-surface-container-low-light dark:bg-surface-container-low-dark"
                >
                  <p className="my-auto px-6 text-primary-light dark:text-primary-dark">
                    GitHub
                  </p>
                </button>
              </Link>
              <Link href={`${collaborator.portfolio_url}`}>
                <button
                  type="submit"
                  className="h-10 ml-1 shadow-md rounded-full bg-surface-container-low-light dark:bg-surface-container-low-dark"
                >
                  <p className="my-auto px-6 text-primary-light dark:text-primary-dark">
                    개인 홈페이지
                  </p>
                </button>
              </Link>
            </div>
          </div>
          <div className="m-2">
            {collaborator.roles.map((role) => (
              <p key={role} className="m-2 text-xl">
                • {role}
              </p>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}
