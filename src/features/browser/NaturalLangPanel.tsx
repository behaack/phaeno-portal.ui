import { FormEvent, useMemo, useState } from "react";
import { PButton, PTextArea } from "@/shared/ui/components";

export function NaturalLangPanel()
{
  const [request, setRequest] = useState("")
  const [isActive, setIsActive] = useState(false)

  const submitHndl = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsActive(true)
  }

  const clearResults = () => {
    setRequest("");
    setIsActive(false)
  }

  return (
    <div className="mt-5">
      <form onSubmit={(e) => submitHndl(e)}>
        <PTextArea
          value={request} 
          label="Type request" 
          description="Request either fasta data or transcript data" 
          placeholder="Type request" 
          onChange={(e) => setRequest(e.currentTarget.value)}          
          disabled={isActive}
        />
        <div className="flex justify-end gap-2 mt-1 mb-3">
          <PButton
            color="black"
            onClick={clearResults}
            disabled={!request}
          >
            Clear Request
          </PButton>          
          <PButton
            type="submit" 
            disabled={!request}
          >
            Run Request
          </PButton>
        </div>
      </form>
    </div>  
  )
}