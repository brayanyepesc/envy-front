import type { 
  IAuthService, 
  LoginInput, 
  RegisterInput, 
  AuthResponse 
} from "../interfaces/auth.interface";
import { AuthRepository } from "../repositories/auth.repository";

export class AuthService implements IAuthService {
  private readonly repository: AuthRepository;

  constructor(repository?: AuthRepository) {
    this.repository = repository || new AuthRepository();
  }

  async login(input: LoginInput): Promise<AuthResponse> {
    this.validateLoginInput(input);
    return await this.repository.login(input);
  }

  async register(input: RegisterInput): Promise<AuthResponse> {
    this.validateRegisterInput(input);
    return await this.repository.register(input);
  }

  async logout(): Promise<void> {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  }

  async refreshToken(): Promise<AuthResponse> {
    const token = localStorage.getItem("token");
    if (!token) {
      throw new Error("No hay token para refrescar");
    }
    return await this.repository.refreshToken(token);
  }

  async validateToken(token: string): Promise<boolean> {
    if (!token) return false;
    return await this.repository.validateToken(token);
  }

  private validateLoginInput(input: LoginInput): void {
    if (!input.email || !input.email.trim()) {
      throw new Error("El email es requerido");
    }
    if (!this.isValidEmail(input.email)) {
      throw new Error("El formato del email no es válido");
    }
    if (!input.password || !input.password.trim()) {
      throw new Error("La contraseña es requerida");
    }
    if (input.password.length < 6) {
      throw new Error("La contraseña debe tener al menos 6 caracteres");
    }
  }

  private validateRegisterInput(input: RegisterInput): void {
    if (!input.names || !input.names.trim()) {
      throw new Error("Los nombres son requeridos");
    }
    if (!input.lastnames || !input.lastnames.trim()) {
      throw new Error("Los apellidos son requeridos");
    }
    if (!input.nickname || !input.nickname.trim()) {
      throw new Error("El nickname es requerido");
    }
    if (input.nickname.length < 3) {
      throw new Error("El nickname debe tener al menos 3 caracteres");
    }
    if (!input.email || !input.email.trim()) {
      throw new Error("El email es requerido");
    }
    if (!this.isValidEmail(input.email)) {
      throw new Error("El formato del email no es válido");
    }
    if (!input.city || !input.city.trim()) {
      throw new Error("La ciudad es requerida");
    }
    if (!input.password || !input.password.trim()) {
      throw new Error("La contraseña es requerida");
    }
    if (input.password.length < 6) {
      throw new Error("La contraseña debe tener al menos 6 caracteres");
    }
    if (!input.confirmPassword || !input.confirmPassword.trim()) {
      throw new Error("La confirmación de contraseña es requerida");
    }
    if (input.password !== input.confirmPassword) {
      throw new Error("Las contraseñas no coinciden");
    }
  }

  private isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
}
