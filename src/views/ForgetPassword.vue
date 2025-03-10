    <template>
        <div class="auth">
            <div class="auth-container">
                <div class="heading">Reset Your Password</div>
                <ErrorBox v-if="msg" :msg="msg" :icon="icon" />
            </div>
            <div class="form-div">
                <div class="form">
                    <div v-if="currentStep === 1">
                        <div class="info">
                            <div class="step-title">Enter Your Email</div>
                            <div class="email-input-container">
                                <input v-model="email" type="text" class="inputField" placeholder="IITR Email*" required
                                    @blur="validateEmail" />
                                <button v-if="!otpSent" @click="sendOTP" class="otp-button"
                                    :disabled="!canProceedToOTP">
                                    Send OTP
                                </button>
                            </div>
                            <div class="text-field-error" v-if="EmailErr">
                                <img src="@/assets/error.svg" class="errImg" />
                                <div>{{ EmailErr }}</div>
                            </div>
                        </div>
                        <div class="info" v-if="otpSent">
                            <div class="verification-message">
                                Please enter the OTP sent to {{ email }}
                            </div>
                            <div class="otp-input-container">
                                <input v-model="otp" type="text" class="inputField" placeholder="Enter OTP" />
                                <button @click="verifyOTP" class="otp-button verify" :disabled="!otp">
                                    Verify OTP
                                </button>
                            </div>
                            <div class="text-field-error" v-if="OtpErr">
                                <img src="@/assets/error.svg" class="errImg" />
                                <div>{{ OtpErr }}</div>
                            </div>
                            <div class="timer-container">
                                <span v-if="timer > 0">Resend OTP in {{ timer }} seconds</span>
                                <button v-else @click="sendOTP" class="resend-button">Resend OTP</button>
                            </div>
                        </div>
                        <div class="form-actions">
                            <div class="next-button" :class="{ disabled: !otpVerified }"
                                @click="proceedToResetPassword">
                                <span class="next-text">Next</span>
                            </div>
                        </div>
                    </div>

                    <div v-if="currentStep === 2">
                        <div class="info">
                            <div class="back-button" @click="currentStep = 1">
                                <span class="back-text">Back</span>
                            </div>
                            <input v-model="password" type="password" class="inputField" placeholder="New Password*"
                                required @blur="validatePassword" />
                            <div class="text-field-error" v-if="PassLen">
                                <img src="@/assets/error.svg" class="errImg" />
                                <div>{{ PassLen }}</div>
                            </div>
                        </div>
                        <div class="info">
                            <input v-model="confirmPassword" type="password" class="inputField"
                                placeholder="Confirm Password*" required @blur="comparePassword" />
                            <div class="text-field-error" v-if="PassErr">
                                <img src="@/assets/error.svg" class="errImg" />
                                <div>{{ PassErr }}</div>
                            </div>
                        </div>
                        <div class="register-button-container">
                            <Button :onclick="resetPassword" class="otp-button" variant="primary-cta"
                                :disabled="!canResetPassword" text="Reset Password" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </template>

<script>
import VerifyOTP from "../api/admin/otpAPI.js";
import ErrorBox from "../components/ErrorBox";
import Button from "@/components/Button.vue";
import AuthAPI from "../api/admin/authAPI.js";

export default {
    name: "forgot-password",
    components: { ErrorBox, Button },
    data() {
        return {
            currentStep: 1,
            msg: null,
            icon: null,
            email: "",
            password: "",
            confirmPassword: "",
            otp: "",
            otpSent: false,
            otpVerified: false,
            EmailErr: "",
            PassLen: "",
            PassErr: "",
            OtpErr: "",
            timer: 0,
            timerInterval: null,
        };
    },
    computed: {
        canProceedToOTP() {
            return this.email && !this.EmailErr;
        },
        canResetPassword() {
            return this.password && this.confirmPassword && !this.PassErr && !this.PassLen && this.password === this.confirmPassword && this.otpVerified;
        },
    },
    methods: {
        startTimer() {
            this.timer = 60;
            if (this.timerInterval) {
                clearInterval(this.timerInterval);
            }
            this.timerInterval = setInterval(() => {
                if (this.timer > 0) {
                    this.timer--;
                } else {
                    clearInterval(this.timerInterval);
                }
            }, 1000);
        },
        validateEmail() {
            const iitrEmailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.iitr\.ac\.in$/;
            if (!this.email) {
                this.EmailErr = "Email is required";
            } else if (!iitrEmailRegex.test(this.email)) {
                this.EmailErr = "Please use your IITR email (@iitr.ac.in)";
            } else {
                this.EmailErr = "";
            }
        },
        validatePassword() {
            this.PassLen = this.password.length < 8 ? "Password should be at least 8 characters" : "";
        },
        comparePassword() {
            this.PassErr = this.password !== this.confirmPassword ? "Passwords don't match" : "";
        },
        async sendOTP() {
            if (this.canProceedToOTP) {
                const otpResponse = await VerifyOTP.sendOTPForForget(this.email);
                if (otpResponse.status !== 200) {
                    this.$vToastify.error(otpResponse.data.error, "Error");
                } else {
                    this.otpSent = true;
                    this.startTimer();
                    this.$vToastify.success("OTP sent to your email", "Success");
                }
            }
        },
        async verifyOTP() {
            this.OtpErr = "";
            const otpResponse = await VerifyOTP.verifyOTPForForget(this.email, this.otp);
            if (otpResponse.status !== 200) {
                this.$vToastify.error(otpResponse.data.error, "Error");
            } else {
                this.otpVerified = true;
                this.$vToastify.success("OTP verified successfully", "Success");
                this.currentStep = 2;

                const { token, role } = otpResponse.data;
                var userInfo = {
                    token: token,
                    login: true,
                    access: true,
                    role: role
                };
                localStorage.setItem("userInfo", JSON.stringify(userInfo));

            }
        },
        proceedToResetPassword() {
            if (this.otpVerified) {
                this.currentStep = 2;
            } else {
                this.$vToastify.error(
                    'Please fill all required fields correctly',
                    'Error'
                );
            }
        },
        async resetPassword() {
            if (this.canResetPassword) {
                const resetResponse = await AuthAPI.resetPassword(this.password);
                if (resetResponse.status !== 200) {
                    this.$vToastify.error(resetResponse.data.message, "Error");
                } else {
                    this.$vToastify.success("Password reset successfully", "Success");
                    setTimeout(() => this.$router.push("/login"), 3000);
                }
            }
        },
    },
};
</script>
