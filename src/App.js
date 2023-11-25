import React, { useState } from 'react';
import { ChatOpenAI } from 'langchain/chat_models/openai';
import { PromptTemplate } from 'langchain/prompts';
import { SupabaseVectorStore } from 'langchain/vectorstores/supabase';
import { OpenAIEmbeddings } from 'langchain/embeddings/openai';
import { StringOutputParser } from 'langchain/schema/output_parser';
import { createClient } from '@supabase/supabase-js';
import './App.css'; // Replace with the actual path to your CSS file
import { useSpeechRecognition } from 'react-speech-kit';
<<<<<<< HEAD
import { useSpeechSynthesis } from "react-speech-kit";
=======
>>>>>>> main

const YourComponent = () => {
  const [valueSpeech, setValueSpeech] = React.useState("");
  const { speak } = useSpeechSynthesis();
  const [chatHistory, setChatHistory] = useState([]);
  const [userInput, setUserInput] = useState('');
  const [questionInput, setQuestionInput] = useState('');
  const [responseText, setResponseText] = useState('');
  const [value, setValue] = useState('')
  const { listen, stop } = useSpeechRecognition({
    onResult: (result) => {
      setValue(result)
    }
  })
  
<<<<<<< HEAD
  const openAPIkey = "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";
=======
  const openAPIkey = "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";
>>>>>>> main
  // const openAPIkey = process.env.OPEN_API_KEY;
  const llm = new ChatOpenAI({ openAIApiKey: openAPIkey });

  const supabase_url = 'https://vnfifwsblpfforaszzkn.supabase.co';
  // const supabase_key = process.env.SUPABASE_API_KEY;
  const supabase_key = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZuZmlmd3NibHBmZm9yYXN6emtuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDA4MjEwNDksImV4cCI6MjAxNjM5NzA0OX0.pdMOIzqKstr1RHfX7bXBwcYmRIWbPjw6aU6RGuQ_qqU";

  const client = createClient(supabase_url, supabase_key);

  const embeddings = new OpenAIEmbeddings({ openAIApiKey: openAPIkey });
  const vectorstore = new SupabaseVectorStore(embeddings, {
    client,
    tableName: 'documents',
    queryName: 'match_documents',
  });

  const combineDocuments = (documents) => {
    return documents.map((doc) => doc.pageContent).join('\n\n');
  };

  const getVectorStoreContexts = async (question) => {
    const retriever = vectorstore.asRetriever();
    const standalone_question =
      'Generate a standalone question based on {question} make as concise as possible if the question is a statement get to the core issue and extract a standalone question from it. standalone question:';
    const standalone_question_prompt = PromptTemplate.fromTemplate(standalone_question);

    const standalone_question_prompt_chain = await standalone_question_prompt
      .pipe(llm)
      .pipe(new StringOutputParser())
      .pipe(retriever);

    const vectorstore_contexts = await standalone_question_prompt_chain.invoke({ question });
    return vectorstore_contexts;
  };

  const generateAnswer = async (question, documents) => {
    const final_response =
      'Generate an answer based on the original question {question} and try to find the answer in the context using the context {context} if an answer is not present in the context have the user email Elliott @ theCloudShepherd@gmail.com always be concise and friendly with your responses, at the end of every response be sure to include to email Elliott @ theCloudShepherd@gmail.com for additional questions this is mandatory that. Like you are speaking to a friend. answer:';
    const final_response_prompt_template = PromptTemplate.fromTemplate(final_response);

    const context = combineDocuments(documents);

    const final_response_chain = await final_response_prompt_template.pipe(llm);

    const result = await final_response_chain.invoke({
      question,
      context,
    });

    return result;
  };

  const progressConversation = async () => {
    // Assuming user input is non-empty
    const question = userInput;
    const vectorstore_contexts = await getVectorStoreContexts(question)
    const result = await generateAnswer(question,vectorstore_contexts)
<<<<<<< HEAD
    console.log(result.content)
    setResponseText(result.content)
=======
    console.log(result)
    setResponseText(result)
>>>>>>> main


  };

  return (
    <div className="container">
      <div className="glassmorphism-box">
        <input
          type="text"
          id="questionInput"
          placeholder="Ask me anything"
          // value={userInput}
          // onChange={(e) => setUserInput(e.target.value)}
        value={value}
         onChange={(event) => setValue(event.target.value)}
        />
         <button onMouseDown={listen} onMouseUp={stop}>
          🎤
        </button>
        <button onClick={progressConversation} className="hover-transition">
          Ask
        </button>
       {/* `<button onClick={progressConversation} className="hover-transition">
          Test
        </button> */}
      </div>

      <div className="glassmorphism-box response-box">
        <textarea
          id="responseTextArea"
          // placeholder="Response will appear here"
          onChange={(e) => setResponseText(e.target.value)}
          // value={chatHistory[chatHistory.length - 1]?.content || ''}
          value={responseText}
          // value={chatHistory[chatHistory.length - 1]?.content || ''}
        />
        <button onClick={() => speak({ text: responseText })}>
                   🗣️ Speech
                </button>
      </div>
      
    </div>
  );
};

export default YourComponent;
