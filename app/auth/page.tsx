'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useAuth } from '@/lib/auth-context';
import { Mail, User, Lock, LogOut } from 'lucide-react';

export default function AuthPage() {
  const router = useRouter();
  const { user, isAuthenticated, login, logout } = useAuth();
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!username.trim()) {
      newErrors.username = 'Username is required';
    }
    if (!email.includes('@')) {
      newErrors.email = 'Valid email is required';
    }
    if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    login(username, email);
    setUsername('');
    setEmail('');
    setPassword('');
    setErrors({});

    router.push('/dashboard');
  };

  const handleLogout = () => {
    logout();
    setUsername('');
    setEmail('');
    setPassword('');
  };

  if (isAuthenticated && user) {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <Header />
        <main className="flex-1 flex items-center justify-center py-20">
          <div className="w-full max-w-md bg-card border border-border/50 rounded-lg p-8 space-y-6">
            <div className="text-center space-y-2">
              <h1 className="text-3xl font-bold text-foreground">مرحباً!</h1>
              <p className="text-muted-foreground">أهلاً وسهلاً، لقد تم تسجيل دخولك!</p>
            </div>

            {/* User Info */}
            <div className="bg-muted/50 rounded-lg p-6 space-y-4">
              <div className="text-center">
                <img
                  src={user.avatar}
                  alt={user.username}
                  className="w-16 h-16 rounded-full mx-auto mb-4"
                />
                <p className="text-lg font-semibold text-foreground">{user.username}</p>
                <p className="text-sm text-muted-foreground">{user.email}</p>
              </div>
            </div>

            {/* Links */}
            <div className="space-y-3">
              <Link
                href="/dashboard"
                className="w-full my-2 px-4 py-2 rounded-lg bg-primary hover:bg-primary/90 text-primary-foreground font-semibold transition-colors text-center"
              >
انتقل إلى لوحة المعلومات
              </Link>
              <button
                onClick={handleLogout}
                className="w-full flex items-center justify-center gap-2 px-4 py-2 rounded-lg border border-border/50 text-foreground hover:bg-muted transition-colors font-semibold"
              >
                <LogOut className="w-5 h-5" />
                تسجيل الخروج

              </button>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      <main className="flex-1 flex items-center justify-center py-20">
        <div className="w-full max-w-md bg-card border border-border/50 rounded-lg p-8">
          <div className="text-center space-y-2 mb-8">
            <h1 className="text-3xl font-bold text-foreground">
              {isLogin ? 'مرحبًا بعودتك' : 'إنشاء حساب'}
            </h1>
            <p className="text-muted-foreground">
              {isLogin
                ? 'سجّل الدخول إلى حسابك للمتابعة'
                : 'انضم إلينا لمتابعة مسلسل الأنمي المفضل لديك'}
            </p>
          </div>

          <form dir="rtl" onSubmit={handleSubmit} className="space-y-4">
            {/* Username */}
            <div className="space-y-2">
              <label htmlFor="username" className="text-sm font-medium text-foreground">
                اسم المستخدم
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <input
                  id="username"
                  type="text"
                  placeholder="أدخل اسم المستخدم الخاص بك"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className={`w-full pl-10 pr-4 py-2 rounded-lg bg-muted border ${
                    errors.username ? 'border-destructive' : 'border-border'
                  } text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50`}
                />
              </div>
              {errors.username && (
                <p className="text-sm text-destructive">{errors.username}</p>
              )}
            </div>

            {/* Email */}
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium text-foreground">
                بريد إلكتروني

              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <input
                  id="email"
                  type="email"
                  placeholder="أدخل بريدك الإلكتروني
"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={`w-full pl-10 pr-4 py-2 rounded-lg bg-muted border ${
                    errors.email ? 'border-destructive' : 'border-border'
                  } text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50`}
                />
              </div>
              {errors.email && (
                <p className="text-sm text-destructive">{errors.email}</p>
              )}
            </div>

            {/* Password */}
            <div className="space-y-2">
              <label htmlFor="password" className="text-sm font-medium text-foreground">
                كلمة المرور

              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <input
                  id="password"
                  type="password"
                  placeholder="أدخل كلمة المرور الخاصة بك
"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={`w-full pl-10 pr-4 py-2 rounded-lg bg-muted border ${
                    errors.password ? 'border-destructive' : 'border-border'
                  } text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50`}
                />
              </div>
              {errors.password && (
                <p className="text-sm text-destructive">{errors.password}</p>
              )}
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="w-full px-4 py-2 rounded-lg bg-primary hover:bg-primary/90 text-primary-foreground font-semibold transition-colors mt-6"
            >
              {isLogin ? 'تسجيل الدخول' : 'إنشاء حساب'}
            </button>
          </form>

          {/* Toggle Form */}
          <div className="mt-6 text-center">
            <p className="text-sm text-muted-foreground">
              {isLogin ? "ليس لديك حساب؟" : 'هل لديك حساب بالفعل؟'}
              <button
                onClick={() => setIsLogin(!isLogin)}
                className="ml-2 text-primary hover:underline font-semibold"
              >
                {isLogin ? 'اشتراك' : 'تسجيل الدخول'}
              </button>
            </p>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}
