import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod";

import { authService } from "../../../app/services/authService";
import { useMutation } from "@tanstack/react-query";
import { SignupParams } from "../../../app/services/authService/signup";
import { toast } from "react-hot-toast";

const schema = z.object({
    name: z.string().nonempty('Nome é obrigatorio!'),
    email: z.string().nonempty('E-mail é obrigatorio!').email('Informe um e-mail válido'),
    password: z.string().nonempty('Senha é obrigatoria!').min(8, 'Senha deve conter pelo menos 8 dígitos'),
});

type FormData = z.infer<typeof schema>;

export function useRegisterController() {
    const {
        handleSubmit: hookFormHandleSubmit,
        register,
        formState: { errors },
     } = useForm<FormData>({
        resolver: zodResolver(schema)
     });

     const { mutateAsync, isPending } = useMutation({
         mutationFn: async (data: SignupParams) => {
            return authService.signup(data);
         },
      });

     const handleSubmit = hookFormHandleSubmit(async (data) => {
         try {
            const { accessToken } = await mutateAsync(data);
            console.log(accessToken);
         } catch (error) {
            toast.error('Ocorreu um erro ao criar sua conta!');
         }
     });     

     return { register, errors, handleSubmit, isPending }
}
