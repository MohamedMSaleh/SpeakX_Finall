import React, { useMemo, useState } from "react";
import {
  ActivityIndicator,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
} from "react-native";
import { router } from "expo-router";
import { colors, borderRadius, shadows } from "../styles/designSystem";

type Mode = "signin" | "forgot";

export default function SignInScreen() {
  const [mode, setMode] = useState<Mode>("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [resetSent, setResetSent] = useState(false);

  const title = useMemo(() => {
    return mode === "signin" ? "✨ Welcome Back!" : "🔐 Reset Password";
  }, [mode]);

  const subtitle = useMemo(() => {
    return mode === "signin"
      ? "Continue your amazing journey"
      : "We’ll help you get back in";
  }, [mode]);

  const handleSignIn = async () => {
    if (!email.trim() || !password.trim()) return;
    setIsLoading(true);

    // TODO: replace with real API/Firebase auth
    setTimeout(() => {
      setIsLoading(false);
      router.replace("/"); // Home (app/index.tsx)
    }, 1200);
  };

  const handleGoogleSignIn = async () => {
    setIsLoading(true);

    // TODO: replace with real Google auth
    setTimeout(() => {
      setIsLoading(false);
      router.replace("/");
    }, 1200);
  };

  const handleResetPassword = async () => {
    if (!email.trim()) return;
    setIsLoading(true);

    // TODO: replace with real reset flow
    setTimeout(() => {
      setIsLoading(false);
      setResetSent(true);
    }, 1200);
  };

  return (
    <ScrollView
      contentContainerStyle={{
        flexGrow: 1,
        backgroundColor: colors.primary.offWhite,
        padding: 16,
        justifyContent: "center",
      }}
      keyboardShouldPersistTaps="handled"
    >
      {/* Header / Logo */}
      <View style={{ alignItems: "center", marginBottom: 18 }}>
        <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
          <Text style={{ fontSize: 40, fontWeight: "900", color: colors.neutral.gray900 }}>
            Speak
          </Text>
          <View
            style={{
              backgroundColor: colors.primary.blue,
              paddingHorizontal: 14,
              paddingVertical: 8,
              borderRadius: borderRadius.large,
              ...shadows.medium,
            }}
          >
            <Text style={{ fontSize: 28, fontWeight: "900", color: colors.primary.white }}>
              X
            </Text>
          </View>
        </View>

        <Text
          style={{
            marginTop: 14,
            fontSize: 28,
            fontWeight: "900",
            color: colors.neutral.gray900,
            textAlign: "center",
          }}
        >
          {title}
        </Text>

        <Text
          style={{
            marginTop: 6,
            color: colors.neutral.gray600,
            fontWeight: "600",
            textAlign: "center",
          }}
        >
          {subtitle}
        </Text>
      </View>

      {/* Card */}
      <View
        style={{
          backgroundColor: colors.primary.white,
          borderRadius: borderRadius.xlarge,
          padding: 16,
          borderWidth: 1,
          borderColor: colors.neutral.gray200,
          ...shadows.large,
        }}
      >
        {mode === "signin" ? (
          <>
            {/* Email */}
            <Text style={labelStyle}>Email Address</Text>
            <TextInput
              value={email}
              onChangeText={setEmail}
              placeholder="hello@example.com"
              placeholderTextColor={colors.neutral.gray400}
              autoCapitalize="none"
              keyboardType="email-address"
              style={inputStyle}
            />

            {/* Password */}
            <Text style={[labelStyle, { marginTop: 12 }]}>Password</Text>
            <View style={{ position: "relative" }}>
              <TextInput
                value={password}
                onChangeText={setPassword}
                placeholder="••••••••"
                placeholderTextColor={colors.neutral.gray400}
                secureTextEntry={!showPassword}
                style={[inputStyle, { paddingRight: 90 }]}
              />

              <Pressable
                onPress={() => setShowPassword((s) => !s)}
                style={{
                  position: "absolute",
                  right: 10,
                  top: 10,
                  height: 44,
                  paddingHorizontal: 12,
                  borderRadius: borderRadius.full,
                  justifyContent: "center",
                  alignItems: "center",
                  backgroundColor: colors.neutral.gray100,
                }}
              >
                <Text style={{ fontWeight: "800", color: colors.neutral.gray700 }}>
                  {showPassword ? "Hide" : "Show"}
                </Text>
              </Pressable>
            </View>

            <Pressable
              onPress={() => {
                setMode("forgot");
                setResetSent(false);
              }}
              style={{ alignSelf: "flex-end", marginTop: 10 }}
            >
              <Text style={{ color: colors.primary.blue, fontWeight: "800", fontSize: 12 }}>
                Forgot Password?
              </Text>
            </Pressable>

            {/* Sign In */}
            <Pressable
              disabled={isLoading}
              onPress={handleSignIn}
              style={{
                marginTop: 16,
                backgroundColor: isLoading ? colors.neutral.gray300 : colors.primary.blue,
                paddingVertical: 14,
                borderRadius: borderRadius.large,
                alignItems: "center",
              }}
            >
              {isLoading ? (
                <ActivityIndicator />
              ) : (
                <Text style={{ color: colors.primary.white, fontWeight: "900", fontSize: 16 }}>
                  Sign In →
                </Text>
              )}
            </Pressable>

            {/* Divider */}
            <View style={{ flexDirection: "row", alignItems: "center", marginVertical: 16 }}>
              <View style={{ flex: 1, height: 1, backgroundColor: colors.neutral.gray200 }} />
              <Text
                style={{
                  marginHorizontal: 10,
                  fontSize: 12,
                  fontWeight: "800",
                  color: colors.neutral.gray400,
                }}
              >
                OR
              </Text>
              <View style={{ flex: 1, height: 1, backgroundColor: colors.neutral.gray200 }} />
            </View>

            {/* Google */}
            <Pressable
              disabled={isLoading}
              onPress={handleGoogleSignIn}
              style={{
                borderWidth: 2,
                borderColor: colors.neutral.gray200,
                paddingVertical: 12,
                borderRadius: borderRadius.large,
                alignItems: "center",
              }}
            >
              <Text style={{ fontWeight: "900", color: colors.neutral.gray700 }}>
                Continue with Google
              </Text>
            </Pressable>

            {/* Sign Up */}
            <View style={{ marginTop: 16, alignItems: "center" }}>
              <Text style={{ color: colors.neutral.gray600, fontWeight: "600" }}>
                Don’t have an account?{" "}
                <Text
                  //onPress={() => router.push("/sign-up")}
                  style={{ color: colors.primary.blue, fontWeight: "900" }}
                >
                  Sign Up
                </Text>
              </Text>
            </View>
          </>
        ) : (
          <>
            {!resetSent ? (
              <>
                <Text style={labelStyle}>Email Address</Text>
                <TextInput
                  value={email}
                  onChangeText={setEmail}
                  placeholder="hello@example.com"
                  placeholderTextColor={colors.neutral.gray400}
                  autoCapitalize="none"
                  keyboardType="email-address"
                  style={inputStyle}
                />

                <Pressable
                  disabled={isLoading}
                  onPress={handleResetPassword}
                  style={{
                    marginTop: 16,
                    backgroundColor: isLoading ? colors.neutral.gray300 : colors.primary.blue,
                    paddingVertical: 14,
                    borderRadius: borderRadius.large,
                    alignItems: "center",
                  }}
                >
                  {isLoading ? (
                    <ActivityIndicator />
                  ) : (
                    <Text style={{ color: colors.primary.white, fontWeight: "900", fontSize: 16 }}>
                      Send Reset Link
                    </Text>
                  )}
                </Pressable>
              </>
            ) : (
              <View
                style={{
                  backgroundColor: "#ECFDF5",
                  borderWidth: 2,
                  borderColor: "#BBF7D0",
                  borderRadius: borderRadius.xlarge,
                  padding: 16,
                  alignItems: "center",
                }}
              >
                <Text style={{ fontSize: 18, fontWeight: "900", color: colors.neutral.gray900 }}>
                  Check your email! 📧
                </Text>
                <Text
                  style={{
                    marginTop: 6,
                    color: colors.neutral.gray600,
                    fontWeight: "600",
                    textAlign: "center",
                  }}
                >
                  We’ve sent password recovery instructions to your inbox.
                </Text>
              </View>
            )}

            <Pressable
              onPress={() => {
                setMode("signin");
                setResetSent(false);
              }}
              style={{ marginTop: 14, alignItems: "center" }}
            >
              <Text style={{ color: colors.neutral.gray700, fontWeight: "900" }}>
                ← Back to Sign In
              </Text>
            </Pressable>
          </>
        )}
      </View>

      {/* Motivational */}
      {mode === "signin" && (
        <View style={{ marginTop: 14, alignItems: "center" }}>
          <View
            style={{
              backgroundColor: colors.primary.white,
              borderRadius: borderRadius.large,
              paddingVertical: 10,
              paddingHorizontal: 14,
              borderWidth: 1,
              borderColor: colors.neutral.gray200,
              ...shadows.soft,
            }}
          >
            <Text style={{ color: colors.neutral.gray700, fontWeight: "800" }}>
              Start speaking with confidence today! 🚀
            </Text>
          </View>
        </View>
      )}
    </ScrollView>
  );
}

const labelStyle = {
  fontSize: 12,
  fontWeight: "900" as const,
  color: colors.neutral.gray700,
  marginBottom: 6,
};

const inputStyle = {
  backgroundColor: colors.neutral.gray50,
  borderWidth: 2,
  borderColor: colors.neutral.gray200,
  borderRadius: borderRadius.large,
  paddingHorizontal: 14,
  paddingVertical: 12,
  fontSize: 14,
  fontWeight: "600" as const,
  color: colors.neutral.gray900,
};
