import Input from "@/Components/Input";
import Label from "@/Components/Label";
import SidePanel from '@/Components/SidePanel';
import { useEffect, useState } from "react";

export default function Edit({category, onClose, onUpdate}) {
    const [name, setName] = useState('')
    const [type, setType] = useState('')

    useEffect(() => {
        if(! category) return;

        setName(category.name)
        setType(category.type)
    }, [category])

    const update = () => {
        Api.updateCategory({
            id: category.id,
            name,
            type
        })
        .then(({data}) => {
            onUpdate(data.data.updateCategory)
        })
        .catch(console.error);
    }
    
    return (
        <SidePanel toggleOpen={! category ? false : true} 
                    onClose={onClose} 
                    title={"Edit Category"}>
            {
                category &&
                <div>
                    <div>
                        <Label forInput="name" value="Name" />

                        <Input
                            type="text"
                            name="name"
                            value={name}
                            className="mt-1 block w-full"
                            handleChange={(e) => setName(e.target.value)}
                        />
                    </div>

                    <div className="col-span-6 sm:col-span-3 mt-4">
                      <label htmlFor="type" className="block text-sm font-medium text-gray-700">
                        Type
                      </label>
                      <select
                        id="type"
                        name="type"
                        value={type}
                        onChange={(e) => setType(e.target.value)}
                        className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      >
                        <option value="INCOME">INCOME</option>
                        <option value="EXPENSES">EXPENSES</option>
                      </select>
                    </div>

                    <div className="flex items-center justify-end mt-4">
                        <button onClick={update} className="inline-flex items-center px-4 py-2 bg-blue-500 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest active:bg-blue-500 transition ease-in-out duration-150">
                            Update
                        </button>
                    </div>
                </div>
            }
        </SidePanel>
    )
  }