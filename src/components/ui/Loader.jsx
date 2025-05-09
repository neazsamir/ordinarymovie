import { Overlay } from './Overlay'
export const Loader = () => { 
	return (
		<>
		<div className="absolute inset-0 flex items-center justify-center z-30">
  <div className="w-12 h-12 rounded-full animate-spin border-[5px] border-dashed border-theme border-t-transparent"></div>
  </div>
  <Overlay isVisible={true} />
  </>
  )
}