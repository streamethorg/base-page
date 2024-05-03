'use server'

import { NavigationMenu } from '@/components/ui/navigation-menu'
import { Page, eTab } from '@/lib/types'
import { IExtendedOrganization } from '@/lib/types'
import NavbarLayout from './NavbarLayout'
import BaseLogo from '@/lib/svg/BaseLogo'
import AllCollections from '@/app/collections/components/AllCollections'
import AboutVideo from '@/app/(home)/components/about/AboutVideos'
import ConnectButtonNav from './Navbar/ConnectButtonNav'
import CloseNavigation from './Navbar/XButton'

const HomePageNavbar = async ({
  pages,
  searchParams,
  showSearchBar = true,
}: {
  logo?: string
  pages: Page[]
  showLogo?: boolean
  showSearchBar?: boolean
  organizations?: IExtendedOrganization[]
  searchParams: any
  currentOrganization?: string
}) => {
  const tab = searchParams.tab
  console.log(tab)

  return (
    <>
      {/*<div className="md:hidden">
        <MobileNavBar pages={pages} showSearchBar={showSearchBar} />
      </div>*/}
      <div className="hidden md:block">
        <DesktopNavBar pages={pages} tab={tab} />
      </div>
    </>
  )
}

// const MobileNavBar = ({
//   pages,
//   showSearchBar,
// }: {
//   pages: Page[]
//   showSearchBar: boolean
// }) => {
//   const [menuVisible, setMenuVisible] = useState(false)
//   const [searchVisible, setSearchVisible] = useState(false)
//   const toggleMenu = () => setMenuVisible(!menuVisible)
//
//   // useLayoutEffect(() => {
//   //   if (menuVisible || searchVisible) {
//   //     document.body.style.overflow = 'hidden'
//   //   } else {
//   //     document.body.style.overflow = 'auto'
//   //   }
//   // }, [menuVisible, searchVisible])
//
//   return (
//     <NavigationMenu className="flex sticky top-0 flex-row items-center bg-black lg:hidden backdrop-blur z-[999999]">
//       {(searchVisible || menuVisible) && (
//         <div className="fixed inset-0 z-50 bg-opacity-50 backdrop-blur-none" />
//       )}
//
//       <div
//         className={cn(
//           'flex relative flex-row items-center p-4 w-full',
//           menuVisible && 'items-start bg-base-blue h-screen'
//         )}>
//         {pages.length > 0 && (
//           <button onClick={toggleMenu} className="z-50">
//             {!menuVisible ? (
//               <Menu
//                 size={30}
//                 strokeWidth={2}
//                 className="text-white text-muted-foreground"
//               />
//             ) : (
//               <X size={30} strokeWidth={1} className="text-white" />
//             )}
//           </button>
//         )}
//         <div className="ml-auto">
//           {showSearchBar && (
//             <Link href={'/'}>
//               <Image
//                 src={'/base_logo.png'}
//                 alt="Logo"
//                 height={30}
//                 width={30}
//                 className="h-full aspect-square"
//               />
//             </Link>
//           )}
//         </div>
//         {menuVisible && <NavbarLayout pages={pages} />}
//       </div>
//     </NavigationMenu>
//   )
// }
//
const DesktopNavBar = async ({
  pages,
  tab,
}: {
  pages: Page[]
  tab?: string | null
}) => {
  const showSidebar = tab !== eTab.none

  return (
    <NavigationMenu className="relative h-full">
      <ConnectButtonNav showSidebar={showSidebar} />

      {showSidebar && (
        <>
          <aside className="absolute w-[50%] bg-base-blue overflow-auto h-full z-20 left-0 top-0">
            <div className="p-2">
              <NavbarLayout pages={pages} />
              {tab === eTab.collections && <AllCollections />}
              {tab === eTab.about && <AboutVideo />}
            </div>
          </aside>
          <div className="absolute top-0 left-[calc(50%)] p-2 pb-4 h-full z-30 flex flex-col items-center">
            <CloseNavigation />
            <div className="flex-grow" />
            <BaseLogo height={'5%'} />
          </div>
        </>
      )}
    </NavigationMenu>
  )
}

export default HomePageNavbar
