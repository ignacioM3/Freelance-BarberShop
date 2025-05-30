import { useQuery } from "@tanstack/react-query"
import LoadingSpinner from "../../components/styles/LoadingSpinner"
import { getAllBranchPublicApi } from "../../api/PublicApi"
import { BranchPublicPrice } from "../../types"


export function Price() {

  const { data, isLoading, isError } = useQuery({
    queryFn: getAllBranchPublicApi,
    queryKey: ['getAllBranchsPublic']
  })

  if (isError) return <h1>falta implementar error</h1>
  if (isLoading) return (
    <div className="flex justify-center items-center h-screen">
      <LoadingSpinner />
    </div>
  )

  if (data) return (
    <div className="my-5 mt-[30px] md:mt-[100px]">
      <p className="text-2xl font-light mt-5 text-center lg:text-xl lg:mt-2 text-white">
        Bienvenido a tu Barberia{" "}
        <span className="text-gray-200 font-bold">Precio de nuestras sucursales</span>
      </p>
      <div>
       <div className="flex flex-wrap justify-center items-center gap-4 mt-10">
         {data.map((branch: BranchPublicPrice) => (
              <div 
                key={branch._id}
                className="bg-amber-50 max-w-[300px] cursor-pointer w-full bg-opacity-90 rounded-xl overflow-hidden shadow-lg border border-amber-200 transform transition-all duration-300 hover:scale-[1.02] hover:shadow-xl"
              >
                <div className="bg-amber-800 p-5">
                  <div className="flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-amber-300 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <h3 className="text-xl font-bold text-amber-100">{branch.name}</h3>
                  </div>
                </div>
                
                <div className="p-5">
                  <ul className="space-y-3">
                    {branch.prices.map((price, index) => (
                      <li key={index} className="flex justify-between items-center py-2 border-b border-amber-200 last:border-0">
                        <div>
                          <span className="font-medium text-amber-900 capitalize">{price.service}</span>
                        </div>
                        <div className="flex items-center">
                          <span className="text-xl font-bold text-amber-700">${price.price}</span>
                        </div>
                      </li>
                    ))}
                  </ul>
                  
                  
                </div>
              </div>
            ))}
       </div>
      </div>
    </div>
  )
}
