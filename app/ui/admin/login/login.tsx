'use client';

import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LoadingButton from "@/app/ui/loading/loadingButton";
import { useState } from "react";


export default function Login({ onLogin }: { onLogin: () => void}) {
  function login(evt: any) {
    evt.preventDefault();

    setIsLoading(true);

    fetch("/api/login", {
      cache: "no-store",
      method: "POST",
      body: JSON.stringify({
                             password: password
                           })
    }).then(r => r.json())
      .then(r => {
        setIsLoading(false);
        if (!r) toast.error("Login fehlgeschlagen.", {
          position: "top-center",
          progress: undefined,
          theme: "light",
          closeOnClick: true,
          pauseOnHover: false
        });
        else {
          localStorage.setItem("token", r);
          toast.success("Login erfolgreich.", {
            position: "top-center",
            progress: undefined,
            theme: "light",
            closeOnClick: true,
            pauseOnHover: false
          });
          onLogin();
        }
      });
  }

  let [isLoading, setIsLoading] = useState(false);
  let [password, setPassword] = useState("");

  return (
    <div className="text-center mt-10">
      <ToastContainer/>

      <form onSubmit={ login }>
        <input type="password" placeholder="Passwort" value={ password }
               onChange={ (e) => setPassword(e.target.value) }
               className="bg-transparent border-b border-b-amber-500 w-72 py-2 text-sm"/>

        <div className="mt-4">
          <LoadingButton type="submit" isLoading={ isLoading }
                         buttonClassName="bg-amber-100 border border-amber-500 py-2 rounded mb-2 w-72 hover:bg-amber-200">Login</LoadingButton>
        </div>
      </form>

    </div>
  );
}
