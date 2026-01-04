import { FormEvent, useState } from "react";
import { PButton, PTextArea } from "@/shared/ui/components";
import { useAiAssistNaturalLangMutation } from "@/api/hooks/ai-assistant.hooks";
import { AiAssistDisplayData } from "./components/ai-assistant/AiAssistDisplayData";
import { AiAssistNextPageRequest, AiAssistResponse, NaturalLangRequest } from "@/api/types/ai-assistant";

export function NaturalLangPanel()
{
  const ai = useAiAssistNaturalLangMutation()
  const [result, setResult] = useState<AiAssistResponse | null>(null)  
  const [isActive, setIsActive] = useState(false)  
  const [request, setRequest] = useState("")

  const submitHndl = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const payload: NaturalLangRequest = {
      requestString: request
    }

    ai.mutate(payload, {
      onSuccess: (data: AiAssistResponse) => {
        setResult(data)
      },
    })

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
      <AiAssistDisplayData result={result} />
    </div>  
  )
}